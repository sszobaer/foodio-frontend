"use client";

import { ShoppingCart } from "lucide-react";

interface Props {
  count?: number;
  onClick?: () => void;
}

export default function CartButton({ count = 0, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-[#1A3C34] bg-transparent text-[#1A3C34]"
      style={{
        height: "32px",
        padding: "0 12px",
      }}
    >
      <ShoppingCart size={14} strokeWidth={1.8} />
      <span
        style={{
          fontFamily: "Manrope",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "100%",
        }}
      >
        {count}
      </span>
    </button>
  );
}