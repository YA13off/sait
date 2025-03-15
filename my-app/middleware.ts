export const config = {
  runtime: 'nodejs', // Важно для работы с Node.js-зависимостями
};

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/utils';

export async function middleware(req: NextRequest) {
  // Пути, к которым не нужна аутентификация
  const publicPaths = [
    '/login',
    '/register',
    '/public',
    '/api', // Важно! Разрешаем все пути под /api/
  ];

  // Проверка статических файлов (CSS/JS и т.д.)
  const isStaticAsset = /\.(css|js|png|jpg|woff2|woff)$/.test(
    req.nextUrl.pathname
  );

  // Проверка, является ли текущий путь публичным или статическим
  const isPublic =
    publicPaths.some((path) => req.nextUrl.pathname.startsWith(path)) ||
    isStaticAsset;

  if (isPublic) {
    return NextResponse.next(); // Пропускаем без проверки
  }

  // Проверяем токен для защищенных путей
  const token = req.cookies.get('token')?.value;
  const isValid = await verifyToken(token);

  // Если токен невалиден → перенаправляем на вход
  if (!isValid) {
    console.log('Неавторизованный запрос:', req.nextUrl.pathname);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}