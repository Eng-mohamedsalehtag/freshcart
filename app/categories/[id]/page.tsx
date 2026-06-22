import React from "react";
import { getSingleCategory } from "@/apis/singlecategory";
import Image from "next/image";
export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const category = await getSingleCategory(id);
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
        <div className="relative h-64 md:h-96 w-full bg-gray-50">
          <Image
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
            width={1000}
            height={600}
            priority
            unoptimized
          />
        </div>
        <div className="p-8 md:p-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-green-600 mb-4 tracking-tight">
            {category.name}
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Explore our premium selection of products in the {category.name}{" "}
            category.
          </p>
        </div>
      </div>
    </div>
  );
}
