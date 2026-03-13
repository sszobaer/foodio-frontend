"use client";

import Image from "next/image";
import AuthSwitch from "./AuthSwitch";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

interface AuthCardProps {
  mode: "sign-in" | "register";
}

export default function AuthCard({ mode }: AuthCardProps) {
  const isRegister = mode === "register";

  return (
    <div
      className="mx-auto flex flex-col items-center"
      style={{
        width: "478px",
        padding: "40px",
        borderRadius: "16px",
        border: "1px solid #E6DED2",
        background: "#FCFBF8",
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        <Image
          src="/logo/ion_fast-food.png"
          alt="Foodio logo"
          width={26}
          height={26}
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
      </div>

      <p
        className="mb-4"
        style={{
          fontFamily: "Manrope",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "24px",
          letterSpacing: "-0.31px",
          color: "#7B7B7B",
          textAlign: "center",
        }}
      >
        Premium flavors, delivered.
      </p>

      <AuthSwitch />

      {isRegister ? <RegisterForm /> : <LoginForm />}
    </div>
  );
}