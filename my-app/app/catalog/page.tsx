"use client";

import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/Footer";
import { Star, X } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const mockProducts: Product[] = [
  // Добавлено 6 случайных товаров
  {
    id: 1,
    name: "Умные часы NeoFit Pro",
    category: "Электроника",
    price: 299.99,
    colors: ["Черный", "Серебристый"],
    brand: "TechElite",
    size: "Универсальный",
    image: "/products/smartwatch.jpg",
    rating: 4.8,
    stock: 15,
  },
  {
    id: 2,
    name: "Кожаная куртка Vintage",
    category: "Одежда",
    price: 459.99,
    colors: ["Коричневый", "Черный"],
    brand: "UrbanStyle",
    size: "M",
    image: "/products/jacket.jpg",
    rating: 4.5,
    stock: 8,
  },
  {
    id: 3,
    name: "Беспроводные наушники SoundX",
    category: "Электроника",
    price: 199.99,
    colors: ["Белый", "Синий"],
    brand: "AudioPro",
    size: "Универсальный",
    image: "/products/headphones.jpg",
    rating: 4.7,
    stock: 20,
  },
  {
    id: 4,
    name: "Беговая дорожка PowerRun",
    category: "Спорт",
    price: 899.99,
    colors: ["Серый", "Красный"],
    brand: "FitLife",
    size: "XL",
    image: "/products/treadmill.jpg",
    rating: 4.6,
    stock: 5,
  },
  {
    id: 5,
    name: "Дизайнерский рюкзак Urban",
    category: "Аксессуары",
    price: 129.99,
    colors: ["Черный", "Хаки"],
    brand: "StreetGear",
    size: "28L",
    image: "/products/backpack.jpg",
    rating: 4.9,
    stock: 12,
  },
  {
    id: 6,
    name: "Электрический чайник Glass",
    category: "Кухня",
    price: 49.99,
    colors: ["Белый", "Серебристый"],
    brand: "HomeTech",
    size: "1.5L",
    image: "/products/kettle.jpg",
    rating: 4.4,
    stock: 25,
  },
];

// Основной компонент каталога
export default function Catalog() {
  const { addToCart, removeFromCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const productsPerPage = 6;
  const categories = Array.from(new Set(mockProducts.map((p) => p.category)));
  const brands = Array.from(new Set(mockProducts.map((p) => p.brand)));

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, priceRange, selectedCategory, selectedBrands]);

  const applyFilters = () => {
    let filtered = [...products];
    filtered = filtered
      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedCategory !== "all")
      filtered = filtered.filter((p) => p.category === selectedCategory);
    if (selectedBrands.length > 0)
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 1000]);
    setSelectedCategory("all");
    setSelectedBrands([]);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} добавлен в корзину`, {
      description: `Цена: $${product.price}`,
      action: {
        label: "Отменить",
        onClick: () => removeFromCart(product.id),
      },
    });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-center sm:text-left">
              Каталог товаров
            </h1>
            <div className="max-w-1xl">
              <Input
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-lg"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            {/* Фильтры */}
            <div className="w-full md:w-72 space-y-8">
              <Accordion type="multiple" className="space-y-6">
                <AccordionItem value="price">
                  <AccordionTrigger>Цена</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex gap-2 mb-4">
                      <div className="flex-1 space-y-1">
                        <Input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([
                              Math.min(+e.target.value, priceRange[1]),
                              priceRange[1],
                            ])
                          }
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <Input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([
                              priceRange[0],
                              Math.max(+e.target.value, priceRange[0]),
                            ])
                          }
                        />
                      </div>
                    </div>
                    <Slider
                      min={0}
                      max={1000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      minStepsBetweenThumbs={1}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="category">
                  <AccordionTrigger>Категории</AccordionTrigger>
                  <AccordionContent>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все категории</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="brand">
                  <AccordionTrigger>Бренды</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => {
                            setSelectedBrands((prev) =>
                              checked
                                ? [...prev, brand]
                                : prev.filter((b) => b !== brand)
                            );
                          }}
                        />
                        <label htmlFor={brand} className="text-sm">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button
                variant="outline"
                className="w-full h-12 text-base"
                onClick={resetFilters}
              >
                Сбросить фильтры
              </Button>
            </div>

            {/* Товары */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-48 w-full rounded-lg" />
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                    {currentProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <CardHeader className="relative p-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={600}
                            height={400}
                            className="rounded-t-lg object-cover h-56 w-full"
                          />
                          <Badge
                            variant="secondary"
                            className="absolute top-4 right-4 text-sm py-1.5 px-3"
                          >
                            {product.stock} в наличии
                          </Badge>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">
                              {product.name}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <Star className="w-5 h-5 fill-primary stroke-primary" />
                              <span className="text-sm font-medium">
                                {product.rating}
                              </span>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-base">
                            {product.brand} • {product.category}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-primary">
                              ${product.price}
                            </span>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                size="default"
                                className="text-base px-6 h-10"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCart(product);
                                }}
                              >
                                В корзину
                              </Button>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <Pagination className="mt-8">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setCurrentPage(Math.max(1, currentPage - 1))
                            }
                            className={
                              currentPage === 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }
                          />
                        </PaginationItem>
                        <span className="px-4">
                          Страница {currentPage} из {totalPages}
                        </span>
                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setCurrentPage(
                                Math.min(totalPages, currentPage + 1)
                              )
                            }
                            className={
                              currentPage === totalPages
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Модальное окно товара */}
        <Dialog
          open={!!selectedProduct}
          onOpenChange={() => setSelectedProduct(null)}
        >
          <DialogContent className="max-w-4xl p-6 sm:p-8">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                  <div className="relative aspect-square">
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-primary">
                        ${selectedProduct.price}
                      </span>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 fill-primary stroke-primary" />
                        <span className="ml-2 text-lg">
                          {selectedProduct.rating}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        Бренд: {selectedProduct.brand}
                      </p>
                      <p className="text-muted-foreground">
                        Категория: {selectedProduct.category}
                      </p>
                      <p className="text-muted-foreground">
                        Цвета: {selectedProduct.colors.join(", ")}
                      </p>
                      <p className="text-muted-foreground">
                        Размер: {selectedProduct.size}
                      </p>
                    </div>

                    <Button
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="w-full py-6 text-lg"
                    >
                      Добавить в корзину
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
      <Toaster position="top-right" richColors expand={false} />
    </div>
  );
}
