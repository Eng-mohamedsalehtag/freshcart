import React from "react";
import { getProducts } from "@/apis/allproducts";
import Card from "@/app/_components/Card/Card";
import Link from "next/link";
import MainSlider from "@/app/_components/MainSlider/MainSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
export default async function Page() {
  const data = await getProducts();

  return (
    <div className="container mx-auto p-4 md:p-4">
      <MainSlider />
      <CategorySlider />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {data.map((product: any) => (
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
