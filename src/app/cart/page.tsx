"use client";

import { useCartStore } from "@/app/store/cartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, totalPrice, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-3">
          🛒 سبد خرید شما خالی است
        </h2>
        <p className="text-gray-500 mb-6">
          به فروشگاه ما سر بزن و اولین خریدت رو انجام بده!
        </p>
        <Link
          href="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all"
        >
          رفتن به فروشگاه 🛍️
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          🛍️ سبد خرید شما
        </h1>

        <div className="space-y-4">
          {items.map((item) => (
            <Card
              key={item.id}
              className="flex items-center justify-between border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-xl border"
                />
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    ${item.price} × {item.quantity}
                  </p>
                  <p className="text-gray-700 font-medium mt-1">
                    جمع: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <Button
                variant="destructive"
                onClick={() => removeFromCart(item.id)}
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              >
                <Trash2 size={18} />
                حذف
              </Button>
            </Card>
          ))}
        </div>

        {/* خلاصه خرید */}
        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            💰 مجموع کل:{" "}
            <span className="text-green-600">${totalPrice().toFixed(2)}</span>
          </h2>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={clearCart}
              className="border-red-600 text-red-600 hover:bg-red-50"
            >
              خالی کردن سبد ❌
            </Button>

            <Link href="/checkout">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                ادامه فرآیند خرید 💳
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
