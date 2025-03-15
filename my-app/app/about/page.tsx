"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Rocket,
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  HeartHandshake,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export default function About() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const team = [
    {
      name: "Глеб Гигант",
      role: "Директор СТО",
      bio: "Эксперт в области цифровой трансформации с 15-летним опытом. Автор 5 патентов в сфере ИИ.",
      image: "/gleb.jpg",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Вадим Валюта",
      role: "Владелец CTO",
      bio: "Технический визионер, руководитель разработки продуктов нового поколения.",
      image: "/vadik.jpg",
      social: { Telegram: "#", github: "#" },
    },
  ];

  const milestones = [
    { year: "2015", event: "Основание компании" },
    { year: "2018", event: "Запуск первой облачной платформы" },
    { year: "2020", event: "Выход на международные рынки" },
    { year: "2023", event: "Получение премии 'Технология года'" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Создаём будущее технологий
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Объединяем инновации и человекоцентричный подход для решения сложных
            задач
          </p>
        </motion.section>

        {/* Values Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Rocket className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Инновации</h3>
              <p className="text-muted-foreground">
                Ежегодно инвестируем 20% прибыли в R&D
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Users className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Команда</h3>
              <p className="text-muted-foreground">
                150+ специалистов мирового уровня
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <HeartHandshake className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Ценности</h3>
              <p className="text-muted-foreground">
                Прозрачность, ответственность, устойчивое развитие
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Ключевые лица</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: index % 2 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-start gap-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={100}
                      height={100}
                      className="rounded-full border-4 border-primary/20"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-primary mb-2">{member.role}</p>
                      <p className="text-muted-foreground mb-4">{member.bio}</p>
                      <div className="flex gap-4">
                        {Object.entries(member.social).map(([key, value]) => (
                          <Button
                            key={key}
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground"
                          >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Наш путь</h2>
          <div className="relative pl-8 border-l-2 border-primary/20">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-12 relative"
              >
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-[25px] top-2 border-4 border-background" />
                <div className="flex gap-8 items-start">
                  <div className="w-32">
                    <Trophy className="w-8 h-8 text-primary mb-2" />
                    <p className="text-2xl font-bold">{milestone.year}</p>
                  </div>
                  <p className="text-lg text-muted-foreground flex-1">
                    {milestone.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Контакты */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Контакты</h2>
          <div className="max-w-2xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <MapPin className="w-12 h-12 text-primary mb-4" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Адрес</h3>
                    <p className="text-muted-foreground">
                      г. Москва, ул. Инновационная, 15
                    </p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Phone className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Телефон</h3>
                      <p className="text-muted-foreground">
                        +7 (495) 123-45-67
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-2">
                    <Mail className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">info@my-store.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
