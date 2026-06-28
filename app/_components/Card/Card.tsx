import React from "react";
import type { Product } from "@/types/product.type";
import { AddBtnCart } from "../AddBtnCart/AddBtnCart";
function Card({ product }: { product: Product }) {
  return (
    <div
      key={product._id}
      className="group p-4 rounded-md overflow-hidden hover:shadow-lg hover:border-green-500 border border-transparent transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-full h-48 mb-4">
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col">
        {/* Category */}
        <span className="text-sm text-green-500 mb-1">
          {product.category?.name}
        </span>

        {/* Title */}
        <h3 className="text-gray-800 text-sm line-clamp-2 mb-3">
          {product.title.split(" ").slice(0, 2).join(" ")}
        </h3>

        {/* Price and Rating */}
        <div className="flex justify-between items-center">
          <span className="text-gray-800 text-sm">{product.price} EGP</span>
          <div className="flex items-center text-sm text-gray-600">
            <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
            <span>{product.ratingsAverage}</span>
          </div>
        </div>
      </div>
      {/* <AddBtnCart id={product._id} /> */}
    </div>
  );
}

export default Card;
