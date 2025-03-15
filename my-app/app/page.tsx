"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Rocket, ShieldCheck, Leaf, MapPin, Phone, Mail } from "lucide-react";

export default function Home() {
  const storeInfo = {
    name: "MyStore",
    tagline: "Инновации для вашего комфорта",
    description:
      "Современные решения для повседневной жизни. Сочетаем передовые технологии с экологичной ответственностью.",
    address: "г. Москва, ул. Инновационная, 15",
    phone: "+7 (495) 123-45-67",
    email: "info@my-store.com",
  };

  const advantages = [
    {
      title: "Экспресс-доставка",
      description: "Получите заказ в течение 24 часов",
      icon: <Rocket className="w-6 h-6" />,
    },
    {
      title: "Гарантия качества",
      description: "30 дней на возврат товара",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      title: "Эко-материалы",
      description: "Безопасно для природы",
      icon: <Leaf className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div
        aria-hidden
        className="absolute inset-0 isolate z-10 hidden opacity-65 contain-strict lg:block"
      >
        <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>
      <Header />
      <main className="flex-1 z-20">
        {/* Hero Section */}
        <section className="relative to-muted/20">
          <div className="max-w-7xl mx-auto px-4 py-24 md:py-32">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {storeInfo.name}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                {storeInfo.tagline}
              </p>
              <Button className="mt-6" size="lg" asChild>
                <Link href="/catalog">Перейти в каталог</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {advantages.map((advantage) => (
                <div
                  key={advantage.title}
                  className="flex flex-col items-center text-center p-6 space-y-4"
                >
                  <div className="p-4 rounded-full bg-primary/10">
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{advantage.title}</h3>
                  <p className="text-muted-foreground">
                    {advantage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* О компании */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Наша философия</h2>
                <p className="text-muted-foreground text-lg">
                  {storeInfo.description}
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" asChild>
                    <Link href="/about/team">Наша команда</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/about/history">История компании</Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src="/of.jpg"
                  alt="О компании"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Контакты */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <Card className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center space-y-2">
                  <MapPin className="w-6 h-6" />
                  <h3 className="text-lg font-medium">Адрес</h3>
                  <p className="text-muted-foreground">{storeInfo.address}</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <Phone className="w-6 h-6" />
                  <h3 className="text-lg font-medium">Телефон</h3>
                  <a
                    href={`tel:${storeInfo.phone}`}
                    className="text-muted-foreground hover:underline"
                  >
                    {storeInfo.phone}
                  </a>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <Mail className="w-6 h-6" />
                  <h3 className="text-lg font-medium">Email</h3>
                  <a
                    href={`mailto:${storeInfo.email}`}
                    className="text-muted-foreground hover:underline"
                  >
                    {storeInfo.email}
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
