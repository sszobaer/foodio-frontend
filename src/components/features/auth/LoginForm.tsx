"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthInput from "./AuthInput";
import { loginSchema, LoginFormData } from "@/schemas/auth/login.schema";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col"
      style={{
        width: "398px",
        gap: "16px",
      }}
    >
      <AuthInput
        label="Email"
        type="email"
        placeholder="name@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <AuthInput
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />

      <button
        type="submit"
        style={{
          width: "398px",
          height: "36px",
          borderRadius: "56px",
          background: "#1A3C34",
          border: "none",
          fontFamily: "Manrope",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "14px",
          letterSpacing: "-0.15px",
          color: "#FFFFFF",
          cursor: "pointer",
        }}
      >
        Sign In
      </button>
    </form>
  );
}