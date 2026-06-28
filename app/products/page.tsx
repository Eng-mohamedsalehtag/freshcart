import React from "react";
import { getProducts } from "@/apis/allproducts";
import Card from "@/app/_components/Card/Card";
import Link from "next/link";
import type { Product } from "@/types/product.type";
export default async function Page() {
  const products: Product[] = await getProducts();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-500">
        All products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {products.map((product: Product) => (
          <div
            key={product._id}
            className="group flex flex-col justify-between p-4 rounded-md overflow-hidden hover:shadow-lg hover:border-green-500 border border-transparent transition-all duration-300"
          >
            <Link
              className="cursor-pointer block flex-grow"
              href={`/productsDetails/${product._id}`}
            >
              <Card product={product} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
