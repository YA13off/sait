"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";

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

    if (!firstName || !lastName || !email || !password) {
      setError("Пожалуйста, заполните все обязательные поля");
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (response.ok) {
        router.push("/account");
      } else {
        const data = await response.json();
        setError(data.error || "Ошибка регистрации");
      }
    } catch (error) {
      setError("Произошла ошибка при регистрации");
    }
  };

  return (
    <>
      <div className="min-h-screen ">
        <Header />
        <div className="mx-auto max-w-lg px-4 pt-20">
          <Card className="p-8 shadow-lg rounded-xl">
            <div className="mb-10 text-center space-y-3">
              <h1 className="text-4xl font-bold tracking-tight">
                Создать аккаунт
              </h1>
              <p className="text-muted-foreground">
                Заполните форму для регистрации
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Имя</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-10 h-12"
                        placeholder="Иван"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Фамилия</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="pl-10 h-12"
                        placeholder="Иванов"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                      placeholder="example@mail.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Пароль</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Подтвердите пароль
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 h-12"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button type="submit" className="w-full h-12 text-base">
                Зарегистрироваться
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              Уже есть аккаунт?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:underline"
              >
                Войти
              </Link>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
