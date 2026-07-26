import { NextResponse } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME?.trim() || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD?.trim() || '';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = String(body.username || '').trim();
    const password = String(body.password || '');

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cookie = `admin-auth=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24}`;
    return NextResponse.json({ ok: true }, { status: 200, headers: { 'Set-Cookie': cookie } });
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ admin: true });
}
