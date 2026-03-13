"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthSwitch() {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <div
      className="mb-8 grid grid-cols-2 items-center"
      style={{
        width: "398px",
        height: "36px",
        borderRadius: "16px",
        background: "#F4F0E8",
        padding: "3.5px",
      }}
    >
      <Link
        href="/sign-in"
        className="flex items-center justify-center"
        style={{
          width: "100%",
          height: "29px",
          borderRadius: "12px",
          border: isSignIn ? "1px solid #EEE8DD" : "1px solid transparent",
          background: isSignIn ? "#FFFFFF" : "transparent",
          fontFamily: "Manrope",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "24px",
          letterSpacing: "-0.15px",
          color: "#202020",
          textDecoration: "none",
        }}
      >
        Sign in
      </Link>

      <Link
        href="/register"
        className="flex items-center justify-center"
        style={{
          width: "100%",
          height: "29px",
          borderRadius: "12px",
          border: !isSignIn ? "1px solid #EEE8DD" : "1px solid transparent",
          background: !isSignIn ? "#FFFFFF" : "transparent",
          fontFamily: "Manrope",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "24px",
          letterSpacing: "-0.15px",
          color: "#202020",
          textDecoration: "none",
        }}
      >
        Register
      </Link>
    </div>
  );
}