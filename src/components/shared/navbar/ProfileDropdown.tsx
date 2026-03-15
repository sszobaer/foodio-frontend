"use client";

import { LogOut, Check, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthProvider";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    router.push("/sign-in");
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "999999px",
          background: "#1A3C34",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <UserRound size={16} color="#FFFFFF" strokeWidth={2.2} />
      </button>

      {open ? (
        <div
          className="absolute right-0 z-50 mt-2 overflow-hidden"
          style={{
            width: "141px",
            minHeight: "126px",
            borderRadius: "6px",
            border: "1px solid #E7E1D7",
            background: "#FFFFFF",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              router.push("/my-account");
            }}
            style={{
              width: "100%",
              background: "#FFFFFF",
              border: "none",
              padding: "14px 12px",
              textAlign: "left",
              fontFamily: "Manrope",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "100%",
              color: "#7B7B7B",
              cursor: "pointer",
            }}
          >
            My Account
          </button>

          <div
            style={{
              margin: "0 6px 6px 6px",
              padding: "10px 10px",
              borderRadius: "4px",
              background: "#F7F7F7",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                router.push("/my-orders");
              }}
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                fontFamily: "Manrope",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "100%",
                color: "#202020",
                cursor: "pointer",
              }}
            >
              Orders
            </button>

            <Check size={16} color="#202020" strokeWidth={2.4} />
          </div>

          <div style={{ borderTop: "1px solid #E7E1D7" }}>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                width: "100%",
                background: "#FFFFFF",
                border: "none",
                padding: "14px 12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "Manrope",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "100%",
                color: "#F04438",
                cursor: "pointer",
              }}
            >
              <LogOut size={16} color="#F04438" strokeWidth={2.2} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
