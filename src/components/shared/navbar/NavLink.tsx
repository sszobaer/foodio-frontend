"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: Props) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full no-underline transition-colors ${
        active
          ? "bg-[#FEF7EA] text-[#1A3C34] border border-[#1A3C34]"
          : "text-[#7A7A7A] hover:text-[#1A3C34]"
      }`}
      style={{
        height: "32px",
        padding: active ? "6px 16px" : "6px 8px",
        fontFamily: "Manrope",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "20px",
        letterSpacing: "-0.15px",
        textDecoration: "none",
      }}
    >
      {label}
    </Link>
  );
}