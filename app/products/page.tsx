import React from "react";
import { getProducts } from "@/apis/allproducts";
import Card from "@/app/_components/Card/Card";
import Link from "next/link";
import type { Product } from "@/types/product.type";
export default async function Page() {
  const products: Product[] = await getProducts();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {products.map((product: Product) => (
          <Link
            className="cursor-pointer block"
            key={product._id}
            href={`/productsDetails/${product._id}`}
          >
            <Card product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
