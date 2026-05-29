import { NextResponse } from 'next/server';
import { getAdminPassword } from '../../../../lib/env';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword = getAdminPassword();

    if (password === adminPassword) {
      const response = NextResponse.json({ success: true, token: adminPassword });
      
      // Set secure HTTP-only cookie
      response.cookies.set('admin_token', adminPassword, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
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
