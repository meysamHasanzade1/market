import SearchProducts from "@/components/SearchProducts";

import Link from "next/link";
import React from "react";

export default async function Products() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const data = await res.json();
  console.log(data);
  return (
    <div>
      <SearchProducts />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <div className="gird grid-cols-1 md:grid-cols-3 gap-4">
          {data.products.map((product: any) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                <img
                  src={product.thumbnail}
                  className="w-full h-40 object-cover rounded-md"
                  alt={product.title}
                />
                <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
                <p className="text-gray-600">price: {product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
