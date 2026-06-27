"use client";
import CartProvider from "./Context/CartContext";
import React from "react";
import { SessionProvider } from "next-auth/react";

const providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
};

export default providers;
