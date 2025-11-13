"use client";

import SearchProducts from "@/components/SearchProducts";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddToCartButton from "@/components/AddToCartButton";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/products", {
        cache: "no-store",
      });
      const data = await res.json();
      setProducts(data.products);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* بخش جستجو */}
        <SearchProducts />

        <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-8 text-center">
          🛍️ محصولات ما
        </h1>

        {/* شبکه محصولات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="shadow-md hover:shadow-xl transition-all border rounded-2xl overflow-hidden"
            >
              <Link href={`/products/${product.id}`}>
                <CardHeader className="p-0">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform"
                  />
                </CardHeader>
              </Link>

              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {product.title}
                </CardTitle>

                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-green-600 font-bold text-lg">
                    ${product.price}
                  </p>

                  <AddToCartButton product={product} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
