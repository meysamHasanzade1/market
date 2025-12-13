"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/admin-login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 animate-pulse text-lg">
          در حال بارگذاری...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800">
          🛍️ داشبورد مدیریت
        </h1>
        <p className="text-gray-600 mt-1">به بخش مدیریت فروشگاه خوش آمدید!</p>
      </div>

      {/* Grid Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Products */}
        <Link
          href="/dashboard/products"
          className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition border hover:border-blue-500 cursor-pointer"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            📦 مدیریت محصولات
          </h2>
          <p className="text-gray-600">افزودن، ویرایش و حذف محصولات</p>
        </Link>

        {/* Orders */}
        <Link
          href="/dashboard/orders"
          className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition border hover:border-blue-500 cursor-pointer"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            📋 سفارش‌ها
          </h2>
          <p className="text-gray-600">مشاهده سفارش‌های ثبت‌شده</p>
        </Link>

        {/* Users */}
        <Link
          href="/dashboard/users"
          className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition border hover:border-blue-500 cursor-pointer"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            👤 کاربران
          </h2>
          <p className="text-gray-600">مشاهده و مدیریت کاربران</p>
        </Link>
      </div>
    </div>
  );
}
