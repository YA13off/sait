import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const token = (await cookies()).get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    // Здесь можно получить данные пользователя из БД по decoded.userId
    return NextResponse.json({ user: { id: decoded.userId, email: 'user@example.com' } });
  } catch (err) {
    return NextResponse.json({ error: 'Невалидный токен' }, { status: 401 });
  }
}