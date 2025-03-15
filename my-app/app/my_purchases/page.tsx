"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Loader2,
  Package,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Item {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  date: string;
  status: "В пути" | "Доставлен" | "Обрабатывается";
  items: Item[];
  total: number;
}

export default function MyPurchases() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const pageSize = 5;

  useEffect(() => {
    const fakeData: Order[] = [
      // ... (ваши данные остаются те же)
    ];

    setTimeout(() => {
      setOrders(fakeData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const indexOfLastOrder = page * pageSize;
  const indexOfFirstOrder = indexOfLastOrder - pageSize;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / pageSize);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Доставлен":
        return "success";
      case "В пути":
        return "secondary";
      case "Обрабатывается":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Package className="h-8 w-8" />
            Мои покупки
          </h1>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                У вас ещё нет покупок
              </p>
              <Button asChild>
                <Link href="/catalog">Перейти в каталог</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Заказ</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Товары</TableHead>
                      <TableHead className="text-right">Сумма</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {order.items.map((item) => (
                              <div
                                key={item.name}
                                className="flex items-center gap-2"
                              >
                                <span>{item.name}</span>
                                <span className="text-muted-foreground">
                                  ×{item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${order.total.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="md:hidden space-y-4">
                {currentOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>Заказ #{order.id}</CardTitle>
                        <Badge variant={getStatusVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Дата:</span>
                          <span>{order.date}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Товары:</span>
                          <span>{order.items.length}</span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Итого:</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full mt-2"
                          size="sm"
                        >
                          Подробнее <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Страница {page} из {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
