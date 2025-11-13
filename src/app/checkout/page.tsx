"use client";

import { useCartStore } from "../store/cartStore";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, CreditCard } from "lucide-react";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const { items, clearCart, totalPrice } = useCartStore();

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!res.ok || !data.id)
        throw new Error("Failed to create Stripe session");

      clearCart();

      const result = await stripe?.redirectToCheckout({ sessionId: data.id });

      if (result?.error) {
        console.error(result.error.message);
        alert("مشکلی در اتصال به Stripe پیش آمد.");
      }
    } catch (error) {
      console.error(error);
      alert("مشکلی در فرآیند پرداخت پیش آمد.");
    }
  };

  // ✅ اگر سبد خالی است
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
        <ShoppingBag size={60} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-3">
          سبد خرید شما خالی است 🛒
        </h2>
        <p className="text-gray-500 mb-6">
          به فروشگاه ما سر بزن و محصولی انتخاب کن.
        </p>
        <Link
          href="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all"
        >
          بازگشت به فروشگاه 🛍️
        </Link>
      </div>
    );
  }

  // ✅ اگر آیتم وجود دارد
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <Card className="w-full max-w-3xl p-6 rounded-2xl shadow-lg bg-white">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          نهایی کردن خرید 🧾
        </h1>

        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {item.quantity} عدد × ${item.price}
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-gray-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* جمع کل */}
          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">جمع کل:</h2>
            <span className="text-2xl font-bold text-green-600">
              ${totalPrice().toFixed(2)}
            </span>
          </div>

          {/* دکمه پرداخت */}
          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <CreditCard size={20} />
              پرداخت آنلاین
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
