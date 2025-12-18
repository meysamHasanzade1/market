import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={600}
            height={400}
            className="w-full h-96 object-cover rounded-lg shadow"
          />

          <div className="grid grid-cols-4 gap-2 mt-4">
            {product.images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Image ${index + 1}`}
                width={100}
                height={80}
                className="w-full h-20 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>

        {/* Details */}
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
