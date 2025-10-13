import React from "react";
export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">محصول پیدا نشد</h1>
      <p className="text-gray-500 mt-2">
        محصولی که به دنبال آن هستید وجود ندارد یا حذف شده است.
      </p>
    </div>
  );
}
