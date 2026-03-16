"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthProvider";
import { CartProvider } from "@/context/CartProvider";
import CartModal from "../cart/AddCartModal";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <CartModal />
      </CartProvider>
    </AuthProvider>
  );
}