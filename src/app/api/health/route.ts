import { NextResponse } from 'next/server';
import { runHealthChecks } from '../../../lib/health-checks';

export const runtime = 'nodejs';

/**
 * GET /api/health
 *
 * Probes every backend integration and reports which services work.
 * Use after deploy: https://your-domain/api/health
 *
 * HTTP status:
 * - 200 = healthy or degraded (no hard failures on configured services)
 * - 503 = unhealthy (one or more configured services failed)
 */
export async function GET() {
  try {
    const report = await runHealthChecks();
    const httpStatus = report.status === 'unhealthy' ? 503 : 200;

    return NextResponse.json(report, {
      status: httpStatus,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Health check failed';

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        message,
        services: {},
        summary: {
          total: 0,
          ok: 0,
          warning: 0,
          error: 1,
          skipped: 0,
          workingServices: [],
          failedServices: ['health'],
          notConfiguredServices: [],
        },
      },
      { status: 503 }
    );
  }
}
