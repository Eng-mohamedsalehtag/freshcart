import React from "react";
import { getCategories } from "@/apis/allcategory";
import { Category } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";
export default async function Page() {
  const category: Category[] = await getCategories();
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-green-600">
        All Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.map((category: Category) => (
          <Link
            href={`/categories/${category._id}`}
            key={category._id}
            className="group cursor-pointer block"
          >
            <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-sm border border-transparent hover:shadow-xl hover:border-green-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <div className="w-full relative overflow-hidden rounded-lg bg-gray-50">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  width={500}
                  height={500}
                  unoptimized
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
