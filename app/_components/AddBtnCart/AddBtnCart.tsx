"use client";
import { AddToCart } from "@/CartAction/AddToCart";
import React, { useContext } from "react";
import { toast } from "sonner";
import { CartContext } from "@/Context/CartContext";

export const AddBtnCart = ({ id }: { id: string }) => {
  const { addProductToCart } = useContext(CartContext);
  async function handleAddToCart() {
    try {
      const data = await addProductToCart(id);
      console.log(data);
      if (data.status === "success") {
        toast.success(data.message);
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button
      className="w-full bg-green-500 text-white py-2.5 rounded-md hover:bg-green-600 transition-colors mt-4"
      onClick={() => handleAddToCart()}
    >
      <i className="fa-solid fa-cart-plus"></i> add to cart
    </button>
  );
};
