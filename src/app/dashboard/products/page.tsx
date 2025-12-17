"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "../../../../types/products";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/dashProduct")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">مدیریت محصولات </h1>
        <Link
          href={"/dashboard/products/new"}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          add new product
        </Link>
      </div>

      {products.length === 0 ? (
        <p>product not exsit</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">نام</th>
              <th className="border p-2">قیمت</th>
              <th className="border p-2">تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: Product) => (
              <tr key={p.id}>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">${p.price}</td>
                <td className="border p-2">
                  {p.createdAt
                    ? new Date(p.createdAt).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductsPage;
