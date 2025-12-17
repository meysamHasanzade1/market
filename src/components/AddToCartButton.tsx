"use client";
import { Product } from "@/../types/products";
import { useCartStore } from "@/app/store/cartStore";

export default function AddToCartButton({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() =>
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        })
      }
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
    >
      اضافه به سبد خرید
    </button>
  );
}
