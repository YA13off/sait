"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Product } from "@/types/product"; // Импортируйте тип Product

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  // Функция для подсчета общей суммы
  const calculateTotal = (items: Product[]) => {
    return items.reduce((sum: number, item: Product) => sum + item.price, 0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Корзина</h1>

          {cartItems.length === 0 ? (
            <p className="text-lg text-muted-foreground">Ваша корзина пуста</p>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((product: Product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-primary">${product.price}</p>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Удалить
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-between items-center">
                <Button variant="outline" onClick={clearCart}>
                  Очистить корзину
                </Button>
                <Button>Оформить заказ (${calculateTotal(cartItems)})</Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
