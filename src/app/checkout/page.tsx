"use client";

import { useCartStore } from "../store/cartStore";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutPage() {
  const { items, clearCart, totalPrice } = useCartStore();
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      // ارسال آیتم‌های سبد خرید به API ما
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!res.ok || !data.id) {
        throw new Error("Failed to create Stripe session");
      }
      clearCart();

      // انتقال کاربر به صفحه پرداخت Stripe
      const result = await stripe?.redirectToCheckout({
        sessionId: data.id,
      });

      if (result?.error) {
        console.error(result.error.message);
        alert("مشکلی در اتصال به Stripe پیش آمد.");
      }

      // در صورت موفقیت بعداً از Webhook سفارش را ثبت می‌کنیم
    } catch (error) {
      console.error(error);
      alert("مشکلی در فرآیند پرداخت پیش آمد.");
    }
  };

  if (items.length === 0) {
    return <div>سبد خرید خالی است 🛒</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">نهایی کردن خرید</h1>
      {items.map((item) => (
        <div key={item.id} className="border-b py-2">
          <p>{item.title}</p>
          <p>
            {item.quantity} × ${item.price}
          </p>
        </div>
      ))}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          مجموع کل: ${totalPrice().toFixed(2)}
        </h2>
      </div>
      <button
        onClick={handleCheckout}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        پرداخت آنلاین
      </button>
    </div>
  );
}

export default CheckoutPage;
