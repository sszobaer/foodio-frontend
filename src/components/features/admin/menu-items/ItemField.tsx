import type { ReactNode } from "react";

interface Props {
  label: string;
  error?: string;
  children: ReactNode;
}

export default function MenuItemField({ label, error, children }: Props) {
  return (
    <div className="space-y-2">
      <label className="block text-[15px] font-medium leading-6 text-[#2B2B2B] sm:text-[16px]">
        {label}
      </label>

      {children}

      {error ? (
        <p className="text-[12px] font-medium leading-4 text-[#E53935]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function getMenuItemInputClassName(error?: string) {
  return `h-[46px] w-full rounded-[8px] border bg-white px-4 text-[15px] font-medium text-[#1F1F1F] outline-none transition placeholder:text-[#B0B0B0] focus:border-[#17352D] ${
    error ? "border-[#E53935]" : "border-[#E8E2D9]"
  }`;
}