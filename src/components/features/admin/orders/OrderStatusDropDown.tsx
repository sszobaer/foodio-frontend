"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

import type { AdminOrderStatus } from "@/types/admin/order.type";
import { formatOrderStatus } from "@/utils/admin/format-order-status.util";
import { useOrderStatusDropdownPosition } from "@/hooks/use-order-status-dropdown-postion";

const ORDER_STATUS_OPTIONS: AdminOrderStatus[] = [
  "PENDING",
  "PREPARING",
  "READY",
  "COMPLETED",
];

interface Props {
  value: AdminOrderStatus;
  disabled?: boolean;
  onChange: (status: AdminOrderStatus) => void;
}

export default function OrderStatusDropdown({
  value,
  disabled,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const triggerWrapperRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { left, top, openUpward } = useOrderStatusDropdownPosition({
    open,
    triggerElement: triggerRef.current,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedTrigger =
        triggerWrapperRef.current?.contains(target) ?? false;
      const clickedMenu = menuRef.current?.contains(target) ?? false;

      if (!clickedTrigger && !clickedMenu) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (status: AdminOrderStatus) => {
    setOpen(false);

    if (status !== value) {
      onChange(status);
    }
  };

  const dropdownMenu =
    open && mounted
      ? createPortal(
          <div
            ref={menuRef}
            className="fixed z-[9999] w-[125px] rounded-[8px] border border-[#D9D3CA] bg-white p-[3px] shadow-[0_10px_30px_rgba(16,24,25,0.08)]"
            style={{
              left,
              top: openUpward ? top - 138 : top,
              transform: openUpward ? "translateY(-100%)" : "none",
            }}
          >
            <div className="flex flex-col gap-0.5">
              {ORDER_STATUS_OPTIONS.map((status) => {
                const selected = status === value;

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleSelect(status)}
                    className={`flex h-[30px] w-full items-center justify-between rounded-[6px] px-[10px] text-[14px] font-medium leading-5 tracking-[-0.15px] text-[#1F1F1F] transition ${
                      selected ? "bg-[#F3F3F3]" : "bg-white hover:bg-[#F8F8F8]"
                    }`}
                  >
                    <span className="flex-1 text-center">
                      {formatOrderStatus(status)}
                    </span>

                    <span className="flex w-4 items-center justify-center">
                      {selected ? (
                        <Check
                          className="h-[18px] w-[18px] text-[#1F1F1F]"
                          strokeWidth={2.4}
                        />
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div ref={triggerWrapperRef} className="relative w-[130px]">
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-[36px] w-[130px] items-center justify-between rounded-[6px] border border-[#E8E2D9] bg-[#FCFBF8] px-3 text-[14px] font-semibold leading-5 tracking-[-0.15px] text-[#5F5F5F] transition hover:bg-[#F8F4EE] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="truncate">{formatOrderStatus(value)}</span>

          <ChevronDown
            className={`h-4 w-4 shrink-0 text-[#A0A0A0] transition ${
              open ? "rotate-180" : ""
            }`}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {dropdownMenu}
    </>
  );
}