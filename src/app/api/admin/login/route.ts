import { NextResponse } from 'next/server';
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    // Use environment variable for password, fallback to standard secure default
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

    if (password === adminPassword) {
      const response = NextResponse.json({ success: true, token: adminPassword });
      
      // Set secure HTTP-only cookie
      response.cookies.set('admin_token', adminPassword, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      
      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid admin credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
