"use client";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, MessageCircle, User, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
  date: string;
  avatar?: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      author: "Иван Иванов",
      text: "Отличный магазин! Быстрая доставка и качественные товары. Рекомендую всем знакомым.",
      rating: 5,
      date: "12 мая 2024",
      avatar: "/avatars/1.jpg",
    },
    {
      id: 2,
      author: "Анна Петрова",
      text: "Хороший выбор моделей, но доставка задержалась на 2 дня. В целом впечатления положительные.",
      rating: 4,
      date: "10 мая 2024",
      avatar: "/avatars/2.jpg",
    },
    {
      id: 3,
      author: "Вадим Центровой",
      text: "10 000 $ Это деньги вообще ?.",
      rating: 5,
      date: "12 июня 2023",
      avatar: "/avatars/2.jpg",
    },
  ]);

  const [newReview, setNewReview] = useState({
    author: "",
    text: "",
    rating: 5,
  });

  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.text) return;

    const review: Review = {
      ...newReview,
      id: Date.now(),
      date: new Date().toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      avatar: `/avatars/${Math.floor(Math.random() * 5) + 1}.jpg`,
    };

    setReviews([review, ...reviews]);
    setNewReview({ author: "", text: "", rating: 5 });
    setShowForm(false);
  };

  const filteredReviews = selectedRating
    ? reviews.filter((review) => review.rating === selectedRating)
    : reviews;

  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col to-muted/10">
      <Header />
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mx-auto"
          >
            Что говорят наши клиенты
          </motion.h1>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 bg-background px-6 py-3 rounded-full border shadow-sm">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                <span className="font-medium text-lg">{averageRating}/5</span>
              </div>
              <Separator orientation="vertical" className="h-6 mx-3" />
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                {reviews.length} отзывов
              </Badge>
            </div>
          </div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12 flex flex-wrap gap-4 justify-center"
        >
          <Button
            variant={!selectedRating ? "default" : "outline"}
            onClick={() => setSelectedRating(null)}
          >
            Все
          </Button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              variant={selectedRating === rating ? "default" : "outline"}
              onClick={() => setSelectedRating(rating)}
              className="flex gap-2 items-center"
            >
              {rating} <Star className="w-4 h-4 fill-current" />
            </Button>
          ))}
        </motion.div>

        {/* Review Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full"
            >
              <Card className="h-full hover:shadow-lg transition-shadow group">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{review.author}</h3>
                      <p className="text-sm text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 flex-1">
                    {review.text}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Полезно
                    </Button>
                    <Button variant="outline" size="sm">
                      Ответить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Review Form Toggle */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowForm(!showForm)}
            variant={showForm ? "secondary" : "default"}
            className="rounded-full px-8 py-6 text-lg"
          >
            {showForm ? "Свернуть форму" : "Написать отзыв"}
            <MessageCircle className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Review Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ваше имя</label>
                    <Input
                      value={newReview.author}
                      onChange={(e) =>
                        setNewReview({ ...newReview, author: e.target.value })
                      }
                      placeholder="Как к вам обращаться?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Текст отзыва</label>
                    <Textarea
                      value={newReview.text}
                      onChange={(e) =>
                        setNewReview({ ...newReview, text: e.target.value })
                      }
                      rows={4}
                      placeholder="Поделитесь вашим опытом..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ваша оценка</label>
                    <div className="flex gap-2 items-center">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Button
                          key={rating}
                          type="button"
                          variant={
                            newReview.rating >= rating ? "default" : "outline"
                          }
                          className="h-10 w-10 p-0 rounded-full"
                          onClick={() => setNewReview({ ...newReview, rating })}
                        >
                          {rating}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Опубликовать отзыв
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}
