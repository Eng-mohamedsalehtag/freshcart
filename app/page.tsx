import React from "react";
import { getProducts } from "@/apis/allproducts";
import Card from "@/app/_components/Card/Card";
import Link from "next/link";
import MainSlider from "@/app/_components/MainSlider/MainSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import type { Product } from "@/types/product.type";
import { AddBtnCart } from "./_components/AddBtnCart/AddBtnCart";
export default async function Page() {
  const data: Product[] = await getProducts();

  return (
    <div className="container mx-auto p-4 md:p-4">
      <MainSlider />
      <CategorySlider />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {data.map((product: Product) => (
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
            <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
              <AddBtnCart id={product._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
