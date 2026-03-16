"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import type { MenuItem } from "@/types/home.type";
import { useAuth } from "@/context/AuthProvider";
import { useCart } from "@/context/CartProvider";

type Props = {
  item: MenuItem;
};

function formatMoney(value: string | number) {
  const amount = Number(value || 0);
  return `$${amount.toFixed(2)}`;
}

export default function FoodCard({ item }: Props) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  return (
    <div className="relative pt-[78px]">
      <div className="absolute -left-10 -top-4 z-20">
        <div className="relative h-[158px] w-[158px] overflow-hidden rounded-full bg-white shadow-[0_10px_24px_rgba(0,0,0,0.14)]">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="158px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="relative min-h-[292px] w-[272px] rounded-bl-[34px] rounded-br-[34px] rounded-tr-[34px] bg-[#F4EEDF] pl-[30px] pr-[26px] pt-[118px]">
        <h3 className="max-w-[180px] text-[20px] font-semibold leading-[1.15] text-[#222222]">
          {item.name}
        </h3>

        <p className="mt-[14px] max-w-[185px] text-[16px] leading-[1.45] text-[#7D7D7D]">
          {item.description}
        </p>

        <p className="mt-[18px] text-[24px] font-bold leading-none text-[#163D35]">
          {formatMoney(item.price)}
        </p>

        {isAuthenticated ? (
          <button
            type="button"
            onClick={() => addToCart(item)}
            className="absolute bottom-[-18px] right-[0px] flex h-[48px] items-center gap-[8px] rounded-bl-[28px] rounded-br-[28px] rounded-tl-[28px] rounded-tr-none bg-[#163D35] px-[26px] text-[15px] font-medium text-white shadow-lg"
          >
            Add to Cart
            <ShoppingCart className="h-[16px] w-[16px]" strokeWidth={2} />
          </button>
        ) : null}
      </div>
    </div>
  );
}