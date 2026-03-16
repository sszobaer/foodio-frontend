"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import { useAuth } from "@/context/AuthProvider";
import { createOrder } from "@/services/public/create-order.service";
import type { MenuItem } from "@/types/home.type";

const CART_STORAGE_KEY = "foodio_cart_v1";

export type CartItem = {
  menuItemId: string;
  name: string;
  price: string;
  imageUrl: string;
  isAvailable: boolean;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  totalAmount: number;
  isSubmitting: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (menuItemId: string) => void;
  increment: (menuItemId: string) => void;
  decrement: (menuItemId: string) => void;
  clearCart: () => void;
  placeOrder: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();

  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const openCart = useCallback(() => {
    if (!isAuthenticated) return;
    setIsOpen(true);
  }, [isAuthenticated]);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const addToCart = useCallback(
    (item: MenuItem) => {
      if (!isAuthenticated) {
        toast.error("Please sign in first.");
        return;
      }

      if (!item.isAvailable) {
        toast.error("This item is not available.");
        return;
      }

      setItems((prev) => {
        const existing = prev.find((x) => x.menuItemId === item.id);

        if (existing) {
          return prev.map((x) =>
            x.menuItemId === item.id
              ? { ...x, quantity: x.quantity + 1 }
              : x
          );
        }

        return [
          ...prev,
          {
            menuItemId: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
            isAvailable: item.isAvailable,
            quantity: 1,
          },
        ];
      });

      toast.success(`${item.name} added to cart`);
    },
    [isAuthenticated]
  );

  const removeFromCart = useCallback((menuItemId: string) => {
    setItems((prev) => prev.filter((x) => x.menuItemId !== menuItemId));
  }, []);

  const increment = useCallback((menuItemId: string) => {
    setItems((prev) =>
      prev.map((x) =>
        x.menuItemId === menuItemId ? { ...x, quantity: x.quantity + 1 } : x
      )
    );
  }, []);

  const decrement = useCallback((menuItemId: string) => {
    setItems((prev) =>
      prev
        .map((x) =>
          x.menuItemId === menuItemId
            ? { ...x, quantity: Math.max(1, x.quantity - 1) }
            : x
        )
        .filter((x) => x.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalAmount = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + Number(item.price || 0) * item.quantity,
        0
      ),
    [items]
  );

  const placeOrder = useCallback(async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in first.");
      return;
    }

    if (!user?.address) {
      toast.error("No delivery address found.");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      setIsSubmitting(true);

      await createOrder({
        items: items.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
        })),
        deliveryAddress: user.address,
      });

      toast.success("Order placed successfully");
      setItems([]);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  }, [isAuthenticated, items, user?.address]);

  const value = useMemo(
    () => ({
      items,
      isOpen,
      itemCount,
      totalAmount,
      isSubmitting,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      increment,
      decrement,
      clearCart,
      placeOrder,
    }),
    [
      items,
      isOpen,
      itemCount,
      totalAmount,
      isSubmitting,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      increment,
      decrement,
      clearCart,
      placeOrder,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}