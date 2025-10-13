import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";
import React from "react";
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
}

async function gteProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("error fetching product:", error);
    return null;
  }
}
async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = await gteProduct(params.id);
  if (!product) {
    return notFound();
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
          <div className="gird grid-cols-4 gap-2 mt-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Image  ${index}`}
                className="w-full h-20 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600 mb-6">
            ${product.price}
          </p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
