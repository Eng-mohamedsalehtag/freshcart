"use client";

import { getUserCart } from "@/CartAction/getUserCart";
import { Cart } from "@/types/cart.type";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
import { AddToCart } from "@/CartAction/AddToCart";

export const CartContext = createContext({});

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartNumber, setCartNumber] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState<Cart["data"]["products"]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  async function fetchUserCart() {
    if (status !== "authenticated" || !session?.accessToken) return;
    setIsLoading(true);
    try {
      const data: Cart = await getUserCart(session.accessToken);
      setCartNumber(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setProducts(data.data.products);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addProductToCart(id: string) {
    try {
      const data = await AddToCart(id);
      await fetchUserCart(); // بعد الإضافة، نحدّث الـ state فعليًا
      return data;
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  }

  useEffect(() => {
    fetchUserCart();
  }, [session?.accessToken, status]);

  return (
    <CartContext.Provider
      value={{
        cartNumber,
        setCartNumber,
        totalCartPrice,
        setTotalCartPrice,
        products,
        setProducts,
        isLoading,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
