import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

export type CheckStatus = 'ok' | 'error' | 'warning' | 'skipped';

export type ServiceCheckResult = {
  service: string;
  status: CheckStatus;
  configured: boolean;
  message: string;
  latencyMs?: number;
  details?: Record<string, string | number | boolean>;
};

export type HealthReport = {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  environment: string;
  runtime: string;
  summary: {
    total: number;
    ok: number;
    warning: number;
    error: number;
    skipped: number;
    workingServices: string[];
    failedServices: string[];
    notConfiguredServices: string[];
  };
  services: Record<string, ServiceCheckResult>;
  /** Action items when status is degraded or unhealthy */
  nextSteps?: string[];
  amplifyHint?: string;
};

const PROBE_TIMEOUT_MS = 10_000;

function trimEnv(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

async function withTimeout<T>(
  label: string,
  ms: number,
  fn: () => Promise<T>
): Promise<T> {
  return Promise.race([
    fn(),
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    }),
  ]);
}

function checkEnvironment(): ServiceCheckResult {
  const keys = {
    MONGODB_URI: !!trimEnv(process.env.MONGODB_URI),
    ADMIN_PASSWORD: !!trimEnv(process.env.ADMIN_PASSWORD),
    CRM_API_URL: !!trimEnv(process.env.CRM_API_URL),
    EMAIL_USER: !!trimEnv(process.env.EMAIL_USER),
    EMAIL_PASS: !!trimEnv(process.env.EMAIL_PASS),
    EMAIL_RECEIVER: !!trimEnv(process.env.EMAIL_RECEIVER),
  };

  const missing = Object.entries(keys)
    .filter(([, set]) => !set)
    .map(([name]) => name);

  const configured = missing.length < Object.keys(keys).length;

  if (missing.length === 0) {
    return {
      service: 'environment',
      status: 'ok',
      configured: true,
      message: 'All expected environment variables are present.',
      details: keys,
    };
  }

  return {
    service: 'environment',
    status: configured ? 'warning' : 'error',
    configured,
    message:
      missing.length === Object.keys(keys).length
        ? 'No backend environment variables detected. On AWS Amplify, add them in the Console and write them to .env.production before build (see AMPLIFY_DEPLOY.md).'
        : `Missing variables: ${missing.join(', ')}`,
    details: keys,
  };
}

async function checkMongoDB(): Promise<ServiceCheckResult> {
  const uri = trimEnv(process.env.MONGODB_URI);

  if (!uri) {
    return {
      service: 'mongodb',
      status: 'skipped',
      configured: false,
      message: 'MONGODB_URI is not set. Admin CMS and dynamic content will use fallbacks only.',
    };
  }

  const started = Date.now();
  let client: MongoClient | null = null;

  try {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 8_000,
      connectTimeoutMS: 8_000,
    });

    await withTimeout('MongoDB connect', PROBE_TIMEOUT_MS, () => client!.connect());
    await withTimeout('MongoDB ping', PROBE_TIMEOUT_MS, () => client!.db().admin().ping());

    const doc = await client
      .db()
      .collection('site_content')
      .findOne({ key: 'landing_page' }, { projection: { key: 1 } });

    return {
      service: 'mongodb',
      status: 'ok',
      configured: true,
      message: 'Connected, ping succeeded, and site_content collection is readable.',
      latencyMs: Date.now() - started,
      details: {
        hasLandingContent: !!doc,
      },
    };
  } catch (error) {
    return {
      service: 'mongodb',
      status: 'error',
      configured: true,
      message: errorMessage(error),
      latencyMs: Date.now() - started,
      details: {
        hint: 'Check MongoDB Atlas Network Access allows AWS (0.0.0.0/0) and URI is correct.',
      },
    };
  } finally {
    await client?.close().catch(() => undefined);
  }
}

async function checkCrm(): Promise<ServiceCheckResult> {
  const crmApiUrl = trimEnv(process.env.CRM_API_URL);

  if (!crmApiUrl) {
    return {
      service: 'crm',
      status: 'skipped',
      configured: false,
      message: 'CRM_API_URL is not set. Lead forms will not sync to CRM.',
    };
  }

  if (/localhost|127\.0\.0\.1/i.test(crmApiUrl)) {
    return {
      service: 'crm',
      status: 'error',
      configured: true,
      message: 'CRM_API_URL points to localhost, which is unreachable from AWS Amplify.',
      details: { crmApiUrl: crmApiUrl.replace(/\/\/.*@/, '//***@') },
    };
  }

  const base = crmApiUrl.replace(/\/$/, '');
  const probeUrls = [
    `${base}/api/website-forms/contact`,
    `${base}/api/health`,
    `${base}/health`,
    base,
  ];

  const started = Date.now();
  let lastError = 'No response from CRM';
  let softHit: { url: string; status: number } | null = null;

  for (const url of probeUrls) {
    try {
      const response = await withTimeout(`CRM ${url}`, PROBE_TIMEOUT_MS, () =>
        fetch(url, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
        })
      );

      if (response.ok) {
        return {
          service: 'crm',
          status: 'ok',
          configured: true,
          message: `CRM reachable at ${url}`,
          latencyMs: Date.now() - started,
          details: { probeUrl: url, httpStatus: response.status },
        };
      }

      // 404 on /health alone is normal — keep probing. 405 on form route = server is up.
      if (response.status < 500) {
        softHit = { url, status: response.status };
        continue;
      }

      lastError = `HTTP ${response.status} from ${url}`;
    } catch (error) {
      lastError = errorMessage(error);
    }
  }

  if (softHit) {
    return {
      service: 'crm',
      status: 'ok',
      configured: true,
      message: `CRM server is online (HTTP ${softHit.status} from ${softHit.url}). Lead POST to /api/website-forms/* should work.`,
      latencyMs: Date.now() - started,
      details: { probeUrl: softHit.url, httpStatus: softHit.status },
    };
  }

  return {
    service: 'crm',
    status: 'error',
    configured: true,
    message: lastError,
    latencyMs: Date.now() - started,
    details: {
      hint: 'Ensure CRM_API_URL is a public HTTPS URL and the server allows requests from AWS.',
    },
  };
}

async function checkEmail(): Promise<ServiceCheckResult> {
  const emailUser = trimEnv(process.env.EMAIL_USER);
  const emailPass = trimEnv(process.env.EMAIL_PASS);
  const emailReceiver = trimEnv(process.env.EMAIL_RECEIVER);

  const placeholders =
    emailUser === 'your-email@gmail.com' || emailPass === 'your-gmail-app-password';

  if (!emailUser || !emailPass || placeholders) {
    return {
      service: 'email',
      status: 'skipped',
      configured: false,
      message: 'EMAIL_USER and EMAIL_PASS are not configured. Lead notification emails will not be sent.',
      details: {
        hasReceiver: !!emailReceiver,
      },
    };
  }

  const started = Date.now();

  try {
    const isGmail = emailUser.toLowerCase().endsWith('@gmail.com');
    const host = trimEnv(process.env.EMAIL_HOST) || (isGmail ? 'smtp.gmail.com' : undefined);
    const port = trimEnv(process.env.EMAIL_PORT)
      ? Number.parseInt(trimEnv(process.env.EMAIL_PORT)!, 10)
      : 587;

    const transporter = host
      ? nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          requireTLS: port === 587,
          auth: { user: emailUser, pass: emailPass },
          connectionTimeout: 10_000,
          greetingTimeout: 10_000,
          socketTimeout: 15_000,
        })
      : nodemailer.createTransport({
          service: 'gmail',
          auth: { user: emailUser, pass: emailPass },
          connectionTimeout: 10_000,
          greetingTimeout: 10_000,
          socketTimeout: 15_000,
        });

    await withTimeout('SMTP verify', PROBE_TIMEOUT_MS, () => transporter.verify());

    return {
      service: 'email',
      status: 'ok',
      configured: true,
      message: 'SMTP connection verified successfully (no test email sent).',
      latencyMs: Date.now() - started,
      details: {
        host: host || 'gmail',
        port,
        hasReceiver: !!emailReceiver,
      },
    };
  } catch (error) {
    const msg = errorMessage(error);
    const gmailBlocked =
      msg.includes('535') ||
      msg.includes('534') ||
      msg.includes('Invalid login') ||
      msg.includes('ECONNREFUSED') ||
      msg.includes('ETIMEDOUT');

    return {
      service: 'email',
      status: 'error',
      configured: true,
      message: msg,
      latencyMs: Date.now() - started,
      details: {
        hint: gmailBlocked
          ? 'Use a Google App Password (not your normal password). On AWS Amplify, Gmail SMTP is often blocked — prefer Amazon SES.'
          : 'Check EMAIL_USER, EMAIL_PASS, and SMTP settings in Amplify environment variables.',
      },
    };
  }
}

function checkAdmin(): ServiceCheckResult {
  const adminPassword = trimEnv(process.env.ADMIN_PASSWORD);
  const fallback = 'password123';

  if (!adminPassword) {
    return {
      service: 'admin',
      status: 'warning',
      configured: false,
      message: `ADMIN_PASSWORD is not set. All admin routes use fallback "${fallback}" — set ADMIN_PASSWORD in Amplify for production.`,
      details: {
        fallback,
      },
    };
  }

  if (adminPassword.length < 8) {
    return {
      service: 'admin',
      status: 'warning',
      configured: true,
      message: 'ADMIN_PASSWORD is set but shorter than 8 characters. Consider a stronger password.',
    };
  }

  return {
    service: 'admin',
    status: 'ok',
    configured: true,
    message: 'ADMIN_PASSWORD is configured for admin login and verify routes.',
  };
}

function buildSummary(services: ServiceCheckResult[]): HealthReport['summary'] {
  const workingServices: string[] = [];
  const failedServices: string[] = [];
  const notConfiguredServices: string[] = [];

  let ok = 0;
  let warning = 0;
  let error = 0;
  let skipped = 0;

  for (const s of services) {
    if (s.status === 'ok') ok++;
    else if (s.status === 'warning') warning++;
    else if (s.status === 'error') error++;
    else skipped++;

    if (!s.configured) {
      notConfiguredServices.push(s.service);
    } else if (s.status === 'ok') {
      workingServices.push(s.service);
    } else if (s.status === 'error') {
      failedServices.push(s.service);
    }
  }

  return {
    total: services.length,
    ok,
    warning,
    error,
    skipped,
    workingServices,
    failedServices,
    notConfiguredServices,
  };
}

function resolveOverallStatus(
  summary: HealthReport['summary']
): HealthReport['status'] {
  if (summary.error > 0) return 'unhealthy';
  if (summary.warning > 0 || summary.skipped > 0) return 'degraded';
  return 'healthy';
}

export async function runHealthChecks(): Promise<HealthReport> {
  const [environment, mongodb, crm, email, admin] = await Promise.all([
    Promise.resolve(checkEnvironment()),
    checkMongoDB(),
    checkCrm(),
    checkEmail(),
    Promise.resolve(checkAdmin()),
  ]);

  const serviceList = [environment, mongodb, crm, email, admin];
  const summary = buildSummary(serviceList);
  const status = resolveOverallStatus(summary);

  const services: Record<string, ServiceCheckResult> = {};
  for (const s of serviceList) {
    services[s.service] = s;
  }

  const coreEnvMissing =
    !services.environment?.details?.MONGODB_URI &&
    !services.environment?.details?.CRM_API_URL;

  const amplifyHint = coreEnvMissing
    ? 'On AWS Amplify, environment variables must be written to .env.production before `next build` (see amplify.yml and AMPLIFY_DEPLOY.md).'
    : undefined;

  const nextSteps: string[] = [];
  if (services.email?.status === 'skipped') {
    nextSteps.push(
      'Add EMAIL_USER, EMAIL_PASS, and EMAIL_RECEIVER in Amplify Console, then redeploy.'
    );
  }
  if (services.email?.status === 'error') {
    nextSteps.push('Fix email: use a Google App Password or Amazon SES; check CloudWatch logs.');
  }
  if (services.crm?.status === 'error') {
    nextSteps.push(
      'CRM unreachable: use a stable public HTTPS URL (ngrok URLs change when tunnel restarts).'
    );
  }
  if (environment.details && environment.status === 'warning') {
    const missing = Object.entries(environment.details)
      .filter(([, v]) => v === false)
      .map(([k]) => k);
    if (missing.length > 0 && !missing.every((k) => k.startsWith('EMAIL_'))) {
      nextSteps.push(`Add missing Amplify variables: ${missing.join(', ')}`);
    }
  }

  return {
    status,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown',
    runtime: 'nodejs',
    summary,
    services,
    ...(nextSteps.length > 0 ? { nextSteps } : {}),
    amplifyHint,
  };
}
