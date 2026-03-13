"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NavLink from "./NavLink";
import CartButton from "./CartButton";

export default function Navbar() {
  return (
    <header className="w-full bg-transparent">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2"
          style={{ textDecoration: "none" }}
        >
          <Image
            src="/logo/ion_fast-food.png"
            alt="Foodio logo"
            width={26}
            height={26}
            className="h-[26px] w-[26px] object-contain"
          />

          <span
            style={{
              fontFamily: "Cormorant Garamond",
              fontWeight: 600,
              fontSize: "26px",
              lineHeight: "100%",
              letterSpacing: "-0.05em",
              color: "#1A3C34",
            }}
          >
            Foodio.
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <NavLink href="/" label="Home" />
          <NavLink href="/food-menu" label="Food Menu" />
          <NavLink href="/my-orders" label="My Orders" />
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-[16px]">
          <CartButton count={2} />

          <Link
            href="/sign-in"
            style={{
              width: "93px",
              height: "32px",
              padding: "0 12px",
              borderRadius: "230px",
              background: "#1A3C34",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: "#ffffff",
              fontFamily: "Manrope",
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Sign in
            <ArrowRight size={14} strokeWidth={2.2} color="#ffffff" />
          </Link>
        </div>

      </div>
    </header>
  );
}