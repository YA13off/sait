import { jwtVerify } from 'jose';
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const verifyToken = async (token: string | null): Promise<boolean> => {
  try {
    if (!token) return false;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
};

export function cn(...inputs: string[]) {
  return twMerge(clsx(inputs))
}