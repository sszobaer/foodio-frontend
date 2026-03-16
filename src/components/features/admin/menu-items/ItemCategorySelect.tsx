"use client";

import { ChevronDown } from "lucide-react";

import type { AdminCategory } from "@/types/admin/menu-item.type";

interface Props {
  value: string;
  categories: AdminCategory[];
  error?: string;
  onChange: (value: string) => void;
}

export default function MenuItemCategorySelect({
  value,
  categories,
  error,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-[46px] w-full appearance-none rounded-[8px] border bg-[#FCFBF8] px-4 pr-10 text-[14px] font-semibold leading-5 tracking-[-0.15px] text-[#5F5F5F] outline-none transition focus:border-[#17352D] ${
          error ? "border-[#E53935]" : "border-[#E8E2D9]"
        }`}
      >
        <option value="">Select category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A0A0A0]"
        strokeWidth={1.8}
      />
    </div>
  );
}