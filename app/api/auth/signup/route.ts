import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const name = String(body.name || '');
    if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: 'User exists' }, { status: 409 });
    const hashed = await bcrypt.hash(password, 10);
    const role = body.role || 'ADMIN';
    const user = await prisma.user.create({ data: { email, password: hashed, name, role } });
    return NextResponse.json({ id: user.id, email: user.email });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
