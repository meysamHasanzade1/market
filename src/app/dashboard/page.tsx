"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/admin-login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="p-6 text-gray-500">در حال بارگذاری...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛍️ داشبورد مدیریت</h1>
      <ul className="space-y-3">
        <li>
          <a href="/dashboard/products" className="text-blue-600">
            📦 مدیریت محصولات
          </a>
        </li>
        <li>
          <a href="/dashboard/orders" className="text-blue-600">
            📋 مشاهده سفارش‌ها
          </a>
        </li>
      </ul>
    </div>
  );
}
