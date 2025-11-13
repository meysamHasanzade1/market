"use client";

import { useCartStore } from "@/app/store/cartStore";
import Link from "next/link";
import { ShoppingCart, LogIn, User, Home } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-3 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      {/* لوگو */}
      <Link href="/" className="flex items-center gap-2">
        <Home className="text-blue-600" size={24} />
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
          Market<span className="text-blue-600">Place</span>
        </h1>
      </Link>

      {/* منو راست */}
      <div className="flex items-center gap-5">
        {/* لینک فروشگاه */}
        <Link
          href="/products"
          className="text-gray-700 hover:text-blue-600 transition font-medium"
        >
          محصولات
        </Link>

        {/* سبد خرید */}
        <Link href="/cart" className="relative hover:scale-105 transition">
          <ShoppingCart
            className="text-gray-700 hover:text-blue-600"
            size={24}
          />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
              {items.length}
            </span>
          )}
        </Link>

        {/* اگر کاربر وارد نشده */}
        {!session ? (
          <Link
            href="/auth/signin"
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <LogIn size={18} /> ورود
          </Link>
        ) : (
          // اگر وارد شده
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
              <User size={18} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {session.user?.name || "کاربر"}
              </span>
            </div>
            <button
              onClick={() => signOut()}
              className="text-red-600 hover:text-red-800 text-sm font-semibold"
            >
              خروج
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
