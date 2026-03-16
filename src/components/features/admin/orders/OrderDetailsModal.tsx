"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type { AdminOrderDetails } from "@/types/admin/order.type";
import { getAdminOrderById } from "@/services/admin/get-admin-order-by-id.service";
import { formatOrderTotal } from "@/utils/admin/format-order-total.util";

interface Props {
  orderId: string | null;
  open: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({ orderId, open, onClose }: Props) {
  const [order, setOrder] = useState<AdminOrderDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !orderId) return;

    let active = true;

    const loadOrder = async () => {
      try {
        setLoading(true);
        const res = await getAdminOrderById(orderId);
        if (!active) return;
        setOrder(res);
      } catch (error) {
        console.error("Failed to get order details:", error);
        if (!active) return;
        setOrder(null);
      } finally {
        if (!active) return;
        setLoading(false);
      }
    };

    loadOrder();

    return () => {
      active = false;
    };
  }, [open, orderId]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open || !orderId) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/35 px-4">
      <div
        className="w-full max-w-[512px] rounded-[12px] border border-[#E6E2D8] bg-[#FFFEFC] shadow-[0px_16px_40px_rgba(16,24,25,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-[25px] pb-0 pt-6">
          <div className="w-[431px]">
            <h2 className="font-manrope text-[18px] font-bold leading-[25px] text-[#183C35]">
              Order Details
            </h2>
            <p className="mt-0 font-manrope text-[18px] font-medium leading-[25px] text-[#183C35]">
              #{orderId}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-[2px] flex h-8 w-8 items-center justify-center rounded-full text-[#9B9B9B] transition hover:bg-[#F4F1EA]"
          >
            <X className="h-6 w-6" strokeWidth={1.8} />
          </button>
        </div>

        <div className="px-[25px] pb-6 pt-[19px]">
          {loading ? (
            <div className="flex h-[171px] items-center justify-center font-manrope text-[14px] font-medium text-[#8A8A8A]">
              Loading...
            </div>
          ) : order ? (
            <div className="flex w-full flex-col gap-[10px]">
              <div className="w-[462px]">
                <p className="font-manrope text-[16px] font-medium leading-[24px] text-[#222222]">
                  Address
                </p>
                <p className="mt-[2px] font-manrope text-[16px] font-medium leading-[24px] text-[#8B8B8B]">
                  {order.deliveryAddress}
                </p>
              </div>

              <div className="border-t border-[#E6E2D8] pt-4">
                <p className="font-manrope text-[16px] font-medium leading-[24px] text-[#222222]">
                  Items
                </p>

                <div className="mt-2 flex flex-col gap-2">
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.itemName}-${index}`}
                      className="flex items-center justify-between"
                    >
                      <p className="font-manrope text-[16px] font-medium leading-[24px] text-[#222222]">
                        {item.quantity}x {item.itemName}
                      </p>

                      <p className="font-manrope text-[16px] font-medium leading-[24px] text-[#8B8B8B]">
                        {formatOrderTotal(item.lineTotal)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-[8px] flex items-center justify-between border-t border-[#E6E2D8] pt-[8px]">
                  <p className="font-manrope text-[18px] font-bold leading-[25px] text-[#222222]">
                    Total
                  </p>

                  <p className="font-manrope text-[18px] font-bold leading-[25px] text-[#222222]">
                    {formatOrderTotal(order.total)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-[171px] items-center justify-center font-manrope text-[14px] font-medium text-[#8A8A8A]">
              Failed to load order details.
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        aria-label="Close modal overlay"
        onClick={onClose}
        className="absolute inset-0 -z-10 cursor-default"
      />
    </div>
  );
}