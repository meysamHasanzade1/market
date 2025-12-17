"use client";

import { useState } from "react";
import { Product } from "../../types/products";

export default function SearchProducts() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/products?search=${search}`);
      const data = await res.json();

      console.log("Search API Response:", data); // 🐞 دیباگ
      setResults(data.products); // ✅ پیشگیری از undefined
    } catch (error) {
      console.error("Search Error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          search
        </button>
      </div>

      {loading && <p>searching...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.length > 0
          ? results.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 shadow">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
                <p className="text-gray-600">price: ${product.price}</p>
              </div>
            ))
          : !loading && (
              <p className="col-span-3 text-center text-gray-500">
                product no found.
              </p>
            )}
      </div>
    </div>
  );
}
