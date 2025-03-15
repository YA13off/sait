"use client";

import Link from "next/link";
import { User, ShoppingCart, Package, ChevronDown, Menu } from "lucide-react";
import { ModeToggle } from "@/components/theme";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { cartItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Левая часть - Логотип */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <Package className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold hidden sm:block">MyStore</span>
          </Link>

          {/* Центральное меню для десктопа */}
          <div className="hidden md:flex items-center gap-8 mx-4 flex-grow justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-base font-medium text-foreground hover:text-primary transition-colors">
                Каталог
                <ChevronDown className="h-5 w-5 mt-0.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem asChild>
                  <Link href="/catalog" className="text-sm">
                    Новинки
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/catalog" className="text-sm">
                    Категории
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/authenticity_check"
              className="text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Проверка
            </Link>
            <Link
              href="/about"
              className="text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              О компании
            </Link>
            <Link
              href="/reviews"
              className="text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Отзывы
            </Link>
          </div>

          {/* Правая часть - Элементы управления */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="relative h-10 w-10 p-2"
              asChild
            >
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-2 hidden sm:inline-flex"
              asChild
            >
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            <ModeToggle />

            {/* Мобильное меню */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" className="h-10 w-10 p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/catalog" className="text-sm">
                    Каталог
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/authenticity_check" className="text-sm">
                    Проверка
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/reviews" className="text-sm">
                    Отзывы
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about" className="text-sm">
                    О нас
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
