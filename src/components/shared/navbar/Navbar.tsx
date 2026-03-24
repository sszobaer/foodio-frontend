"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

import NavLink from "./NavLink";
import CartButton from "./CartButton";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "@/context/AuthProvider";
import { useCart } from "@/context/CartProvider";

export default function Navbar() {
  const { isAuthenticated, isLoading } = useAuth();
  const { itemCount, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-0"
      }`}
    >
      <div
        className={`mx-auto flex h-[96px] max-w-[1280px] items-center justify-between px-4 md:px-6 transition-colors duration-300 ${
          isScrolled ? "bg-transparent" : "bg-white md:bg-transparent"
        }`}
      >
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

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/" label="Home" />
          <NavLink href="/food-menu" label="Food Menu" />
          <NavLink href="/my-orders" label="My Orders" />
        </nav>

        <div className="flex items-center gap-4">
          {!isLoading && isAuthenticated ? (
            <CartButton count={itemCount} onClick={openCart} />
          ) : null}

          {isLoading ? null : isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <Link
              href="/sign-in"
              style={{
                width: "93px",
                height: "32px",
                marginLeft: "16px",
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
          )}

          <button
            className="md:hidden flex items-center justify-center p-2 text-[#1A3C34]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[96px] left-0 w-full bg-white border-b border-[#EEE7DD] shadow-lg px-6 py-6 flex flex-col gap-6 z-40">
          <div onClick={() => setIsMobileMenuOpen(false)}>
            <NavLink href="/" label="Home" />
          </div>
          <div onClick={() => setIsMobileMenuOpen(false)}>
            <NavLink href="/food-menu" label="Food Menu" />
          </div>
          <div onClick={() => setIsMobileMenuOpen(false)}>
            <NavLink href="/my-orders" label="My Orders" />
          </div>
        </div>
      )}
    </header>
  );
}