import { NextResponse, NextRequest } from 'next/server';
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || 'cloudblitz123';
    
    // Extract token from HTTP-only cookie
    const tokenCookie = request.cookies.get('admin_token')?.value;
    
    // Extract token from Authorization header fallback
    const authHeader = request.headers.get('authorization');
    const tokenHeader = authHeader ? authHeader.replace('Bearer ', '') : null;

    const token = tokenCookie || tokenHeader;

    if (token === adminPassword) {
      return NextResponse.json({ success: true, verified: true });
    }

    return NextResponse.json({ success: false, verified: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, verified: false }, { status: 500 });
  }
}
export async function GET(request: NextRequest) {
  // Support GET checks for quick browser validation
  return POST(request);
}
