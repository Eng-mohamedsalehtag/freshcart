import React from "react";
import { getCategories } from "@/apis/allcategory";
import { Category } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";
export default async function Page() {
  const category: Category[] = await getCategories();
  return (
    <div className="container mx-auto p-4 md:p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-500">
        All Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {category.map((category: Category) => (
          <Link href={"/"} key={category._id} className="cursor-pointer block">
            <div className="text-center p-4 hover:shadow-lg hover:border border-green-500 rounded-lg">
              <Image
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-fit rounded-lg"
                width={500}
                height={500}
                unoptimized
              />
              <p className="mt-2 text-lg font-semibold">{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
