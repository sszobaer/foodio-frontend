"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, X } from "lucide-react";

import { useCart } from "@/context/CartProvider";

function money(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function CartModal() {
  const {
    items,
    isOpen,
    closeCart,
    increment,
    decrement,
    removeFromCart,
    totalAmount,
    placeOrder,
    isSubmitting,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-[700px] rounded-[14px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between px-6 pb-2 pt-5">
          <p className="text-[16px] font-semibold text-[#A0A0A0]">
            Order Details
          </p>

          <button
            type="button"
            onClick={closeCart}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#7A7A7A]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 pb-5">
          <div className="rounded-[14px] border border-[#E6DED4] bg-white px-4 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-semibold text-[#1A3C34]">Cart</h2>
              <p className="text-[16px] text-[#8A8A8A]">
                {items.length} Items
              </p>
            </div>

            <div className="mt-4">
              {items.length === 0 ? (
                <div className="py-10 text-center text-[15px] text-[#7D7D7D]">
                  Your cart is empty.
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <div key={item.menuItemId}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="relative h-[44px] w-[44px] overflow-hidden rounded-full bg-[#F6F1E8]">
                              <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                sizes="44px"
                                className="object-cover"
                              />
                            </div>

                            <div>
                              <p className="text-[16px] font-medium text-[#2B2B2B]">
                                {item.name}
                              </p>
                              <p className="mt-1 text-[14px] text-[#8C8C8C]">
                                Quantity : {item.quantity}
                              </p>

                              <div className="mt-3 flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => decrement(item.menuItemId)}
                                  className="inline-flex h-[24px] w-[24px] items-center justify-center rounded-full border border-[#8E9A91] text-[#1A3C34]"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>

                                <div className="flex h-[28px] min-w-[36px] items-center justify-center rounded-[6px] border border-[#D8D0C5] px-3 text-[14px] text-[#4D4D4D]">
                                  {item.quantity}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => increment(item.menuItemId)}
                                  className="inline-flex h-[24px] w-[24px] items-center justify-center rounded-full border border-[#1A3C34] text-[#1A3C34]"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="flex min-w-[80px] flex-col items-end">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.menuItemId)}
                              className="text-[#F04438]"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                            <p className="mt-11 text-[16px] font-semibold text-[#222222]">
                              {money(Number(item.price) * item.quantity)}
                            </p>
                          </div>
                        </div>

                        {index !== items.length - 1 ? (
                          <div className="mt-4 border-t border-[#E8E1D7]" />
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-[#E8E1D7] pt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[18px] font-semibold text-[#2A2A2A]">
                        Total Amount :
                      </p>
                      <p className="text-[18px] font-semibold text-[#2A2A2A]">
                        {money(totalAmount)}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={closeCart}
                        className="inline-flex h-[42px] items-center justify-center rounded-full border border-[#1A3C34] px-6 text-[15px] font-medium text-[#1A3C34]"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={placeOrder}
                        className="inline-flex h-[42px] items-center justify-center rounded-full bg-[#1A3C34] px-6 text-[15px] font-medium text-white disabled:opacity-60"
                      >
                        {isSubmitting ? "Confirming..." : "Confirm Order"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}