// app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Валидация полей
      if (!firstName || !lastName || !email || !password) {
        throw new Error("Все поля обязательны для заполнения");
      }

      if (password !== confirmPassword) {
        throw new Error("Пароли не совпадают");
      }

      // Отправка данных на сервер
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка регистрации");
      }

      // Перенаправление после успешной регистрации
      router.push("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    }
  };

  return (
    {/* Остальная часть JSX без изменений */}
  );
}