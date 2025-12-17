"use client";
import React, { useEffect } from "react";
import { useCartStore } from "../store/cartStore";

function ThankYouPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart(); // پاک کردن سبد بعد از رسیدن به صفحه تشکر
  }, [clearCart]);
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600">🎉 سفارش شما ثبت شد</h1>
      <p className="mt-4 text-gray-600">از خرید شما سپاسگزاریم.</p>
    </div>
  );
}

export default ThankYouPage;
