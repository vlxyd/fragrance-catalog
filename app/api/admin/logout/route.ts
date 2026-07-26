import { NextResponse } from 'next/server';

export async function POST() {
  const cookie = `admin-auth=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
  return NextResponse.json({ ok: true }, { status: 200, headers: { 'Set-Cookie': cookie } });
}
