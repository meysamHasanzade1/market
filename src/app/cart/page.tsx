"use client";

import { useCartStore } from "@/app/store/cartStore";

export default function CartPage() {
  const { items, removeFromCart, totalPrice, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">سبد خرید خالی است 🛒</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">سبد خرید</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded-lg shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-600">
                  ${item.price} × {item.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <h2 className="text-xl font-semibold">
          مجموع کل: ${totalPrice().toFixed(2)}
        </h2>
        <button
          onClick={clearCart}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg mt-4"
        >
          خالی کردن سبد
        </button>
      </div>
    </div>
  );
}
