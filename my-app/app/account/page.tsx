"use client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, User, ShoppingBag, Settings, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

interface UserData {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface Order {
  id: number;
  date: string;
  status: "processing" | "shipped" | "delivered";
  total: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData>({
    id: 1,
    name: "Иван Петров",
    email: "ivan@example.com",
    avatar: "/vova.jpg",
  });

  const [orders] = useState<Order[]>([
    { id: 1, date: "15 мая 2024", status: "delivered", total: 299.99 },
    { id: 2, date: "12 мая 2024", status: "shipped", total: 159.99 },
  ]);

  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Смартфон XYZ",
      price: 299.99,
      image: "gleb.jpg",
    },
    {
      id: 2,
      title: "Кабан обыкновенный",
      price: 1299.99,
      image: "kaban.jpg",
    },
    {
      id: 3,
      title: "Товар 3",
      price: 499.99,
      image: "https://i.pravatar.cc/300?img=3",
    },
    {
      id: 4,
      title: "Товар 4",
      price: 899.99,
      image: "https://i.pravatar.cc/300?img=4",
    },
    {
      id: 5,
      title: "Товар 5",
      price: 1232.99,
      image: "https://i.pravatar.cc/300?img=5",
    },
    {
      id: 6,
      title: "Товар 6",
      price: 1455.99,
      image: "https://i.pravatar.cc/300?img=6",
    },
    // Добавьте больше товаров...
  ]);

  const [activeTab, setActiveTab] = useState<"orders" | "settings">("orders");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormData({ name: user.name, email: user.email, password: "" });
  }, [user]);

  const handleSaveProfile = () => {
    setUser({ ...user, name: formData.name, email: formData.email });
    setIsEditing(false);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Боковая панель */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="p-6 text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold mb-2">{user.name}</h2>
              <p className="text-muted-foreground mb-6">{user.email}</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/logout")}
              >
                <LogOut className="mr-2 h-4 w-4" /> Выйти
              </Button>
            </Card>
          </motion.div>

          {/* Основной контент */}
          <div className="space-y-8">
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as any)}
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="orders">
                  <ShoppingBag className="mr-2 h-4 w-4" /> Заказы
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="mr-2 h-4 w-4" /> Настройки
                </TabsTrigger>
              </TabsList>

              {/* Вкладка заказов */}
              <TabsContent value="orders" className="space-y-6">
                <h2 className="text-2xl font-bold">История заказов</h2>
                {orders.map((order) => (
                  <Card
                    key={order.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Заказ #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            {order.date}
                          </p>
                        </div>
                        <Badge
                          variant={
                            order.status === "delivered"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Сумма:</span>
                        <span className="font-medium">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Вкладка настроек */}
              <TabsContent value="settings" className="space-y-6">
                <h2 className="text-2xl font-bold">Настройки профиля</h2>

                {/* Редактирование профиля */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <User className="h-6 w-6 text-primary" />
                      <h3 className="text-lg font-medium">Личная информация</h3>
                    </div>

                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Имя</Label>
                          <Input
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleSaveProfile}>Сохранить</Button>
                          <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                          >
                            Отмена
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-muted-foreground">{user.email}</p>
                        <Button
                          variant="secondary"
                          onClick={() => setIsEditing(true)}
                        >
                          Редактировать
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Безопасность */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <Lock className="h-6 w-6 text-primary" />
                      <h3 className="text-lg font-medium">Безопасность</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Новый пароль</Label>
                        <Input type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label>Подтверждение пароля</Label>
                        <Input type="password" />
                      </div>
                      <Button>Обновить пароль</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Рекомендации */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-center">
                Рекомендуем для вас
              </h2>
              <div className="flex justify-center">
                <Carousel className="w-full max-w-4xl">
                  <CarouselContent className="-ml-4">
                    {products.map((product) => (
                      <CarouselItem
                        key={product.id}
                        className="md:basis-1/3 lg:basis-1/4 pl-4"
                      >
                        <Card className="hover:shadow-lg transition-shadow h-full">
                          <CardContent className="p-4 flex flex-col h-full">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="font-medium flex-grow">
                              {product.title}
                            </h3>
                            <p className="text-muted-foreground">
                              ${product.price.toFixed(2)}
                            </p>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="mt-4 flex justify-center gap-4">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                </Carousel>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
