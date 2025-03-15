import { NextRequest, NextResponse } from 'next/server';
import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

// Пример пользовательских данных (замените на базу данных)
const users = [
  { id: 1, email: '1@x.ru', password: '123' }
];

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log(123)

  const user = users.find(u => u.email === email);
  if (!user ) {
    return NextResponse.json({ error: 'Неверные данные' }, { status: 401 });
  }

  // Создаем JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  
  // Устанавливаем куку
  (await cookies()).set('token', token, { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 9999 // 1 час
  });

  return NextResponse.json({ success: true });
}