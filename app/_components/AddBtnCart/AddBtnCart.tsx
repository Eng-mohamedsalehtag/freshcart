"use client";
import React, { useContext } from "react";
import { toast } from "sonner";
import { CartContext } from "@/Context/CartContext";

export const AddBtnCart = ({ id }: { id: string }) => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("AddBtnCart must be used within a CartProvider");
  }

  const { addProductToCart } = context;

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
