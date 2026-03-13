"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthInput from "./AuthInput";
import {
  registerSchema,
  RegisterFormData,
} from "@/schemas/auth/register.schema";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Register data:", data);
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
        label="Full Name"
        placeholder="John Doe"
        error={errors.fullName?.message}
        {...register("fullName")}
      />

      <AuthInput
        label="Email"
        type="email"
        placeholder="name@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <AuthInput
        label="Address"
        placeholder="e.g. House:23, Road:23, Jamaica, USA"
        error={errors.address?.message}
        {...register("address")}
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
        Create Account
      </button>
    </form>
  );
}