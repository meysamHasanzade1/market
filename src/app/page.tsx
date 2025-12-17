"use client";
import AddToCartButton from "@/components/AddToCartButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "../../types/products";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=8")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error("error in catch products", err));
  }, []);
  return (
    <main>
      <section className="text-center py-16 bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
        <h2 className="text-4xl font-bold mb-4">به مارکت‌پلیس ما خوش آمدید!</h2>
        <p className="text-lg opacity-90">
          محصولات باکیفیت از بهترین فروشندگان
        </p>

        <Link href={"/products"}>
          <Button className="mt-6 cursor-pointer bg-white text-indigo-600 hover:bg-gray-100">
            مشاهده محصولات
          </Button>
        </Link>
      </section>

      <section className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <Image
                  width={200}
                  height={200}
                  src={product.thumbnail}
                  alt={product.title}
                  className="rounded-lg mb-3 w-full h-40 object-cover"
                />
                <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${product.price}</span>
                  <AddToCartButton product={product} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        <footer className="bg-white text-center py-4 mt-10 border-t">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} MarketPlace — ساخته شده با ❤️
          </p>
        </footer>
      </section>
    </main>
  );
}
