"use client";

import { getUserCart } from "@/CartAction/getUserCart";
import { Cart } from "@/types/cart.type";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartNumber, setCartNumber] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState<Cart["data"]["products"]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated" || !session?.accessToken) {
      return;
    }

    async function fetchUserCart() {
      setIsLoading(true);
      try {
        const data: Cart = await getUserCart(session.accessToken);
        setCartNumber(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setProducts(data.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        setIsLoading(false);
      }
    }

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
