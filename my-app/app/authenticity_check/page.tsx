"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/Footer";

export default function CheckAuthenticity() {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    status: "pending" | "success" | "failure";
    message: string;
  } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    handleFiles(files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleFiles = (files: FileList) => {
    // Проверка размера и типа файлов
    for (const file of Array.from(files)) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Файл слишком большой (макс. 10MB)");
        return;
      }
      if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
        alert("Поддерживаемые форматы: JPG, PNG, PDF");
        return;
      }
    }

    setIsLoading(true);
    setIsChecking(true);
    setResult(null);

    // Имитация проверки (можно заменить на реальный fetch)
    setTimeout(() => {
      const randomResult = Math.random();
      if (randomResult < 0.7) {
        setResult({ status: "success", message: "Товар подлинный!" });
      } else {
        setResult({
          status: "failure",
          message: "Обнаружены признаки подделки",
        });
      }
      setIsLoading(false);
      setIsChecking(false);
    }, 3000);
  };

  return (
    <>
      <main className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto pt-16">
          <h1 className="text-3xl font-bold mb-8 text-foreground">
            Проверка оригинальности
          </h1>

          <Card className="p-6 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Загрузите чек или фото товара
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg cursor-pointer ${
                  dragOver ? "border-primary" : "border-muted"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  type="file"
                  accept="image/*, application/pdf"
                  multiple
                  className="hidden"
                  id="fileInput"
                  onChange={handleFileUpload}
                />
                <Button
                  variant="outline"
                  className="w-full mb-4"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  <FilePlus className="w-5 h-5 mr-2" />
                  Выбрать файл
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Или перетащите файл сюда
                </p>
              </div>

              {/* Индикатор загрузки */}
              {isChecking && (
                <div className="flex items-center space-x-2 mt-4">
                  <div className="flex items-center space-x-2 animate-pulse">
                    <Skeleton className="w-4 h-4 rounded-full bg-primary" />
                    <Skeleton className="w-24 h-4 rounded" />
                  </div>
                  <Skeleton className="w-32 h-4 rounded" />
                </div>
              )}

              {/* Результат проверки */}
              {result && (
                <div
                  className="fixed top-16 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-black text-white p-4 rounded-lg shadow-lg z-50"
                  style={{ maxWidth: "480px" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">
                        {result.status === "success" ? (
                          <Check className="text-green-500" />
                        ) : (
                          <X className="text-red-500" />
                        )}
                      </span>
                      <h3 className="text-lg font-semibold">
                        {result.status === "success" ? "Успех!" : "Ошибка"}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResult(null)}
                      className="text-gray-400 hover:text-gray-200 transition"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <p className="text-sm mb-2">{result.message}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Скелетоны для имитации загрузки страницы */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-48 rounded-lg mb-4" />
              <Skeleton className="h-48 rounded-lg mb-4" />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
