"use client";

import { getUserCart } from "@/CartAction/getUserCart";
import { Cart } from "@/types/cart.type";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
import { AddToCart } from "@/CartAction/AddToCart";
import { RemoveFromCart } from "@/CartAction/removeCartItem";
interface CartContextType {
  cartNumber: number;
  setCartNumber: React.Dispatch<React.SetStateAction<number>>;
  totalCartPrice: number;
  setTotalCartPrice: React.Dispatch<React.SetStateAction<number>>;
  products: Cart["data"]["products"];
  setProducts: React.Dispatch<React.SetStateAction<Cart["data"]["products"]>>;
  isLoading: boolean;
  addProductToCart: (id: string) => Promise<any>;
  removeFromCart: (id: string) => Promise<any>;
  updateCartItemCount: (id: string, count: number) => Promise<any>;
  clearCart: () => Promise<any>;
}
export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartNumber, setCartNumber] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState<Cart["data"]["products"]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  async function fetchUserCart(showLoading = true) {
    if (status !== "authenticated" || !session?.accessToken) return;
    if (showLoading) setIsLoading(true);
    try {
      const data: Cart = await getUserCart(session.accessToken);
      setCartNumber(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setProducts(data.data.products);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  }

  async function addProductToCart(id: string) {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });
      const data = await res.json();
      await fetchUserCart(false); // ⬅️ من غير ما يظهر Loading screen
      return data;
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  }

  async function removeFromCart(id: string) {
    try {
      const res = await fetch(`/api/cart?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      await fetchUserCart(false); // ⬅️ من غير ما يظهر Loading screen
      return data;
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  }
  async function updateCartItemCount(id: string, count: number) {
    try {
      const res = await fetch(`/api/cart?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count }),
      });

      const data = await res.json();
      await fetchUserCart(false);
      return data;
    } catch (error) {
      console.error("Failed to update cart item count:", error);
    }
  }
  //clear whole cart
  async function clearCart() {
    try {
      const res = await fetch(`/api/cart`, { method: "DELETE" });
      const data = await res.json();
      await fetchUserCart(false); // ⬅️ من غير ما يظهر Loading screen
      return data;
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  }

  useEffect(() => {
    fetchUserCart(); // هنا بس هيظهر Loading لأنه أول تحميل
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
        removeFromCart,
        updateCartItemCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
