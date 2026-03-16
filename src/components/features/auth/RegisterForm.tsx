"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthInput from "./AuthInput";
import {
  registerSchema,
  type RegisterFormData,
} from "@/schemas/auth/register.schema";
import { registerUser } from "@/services/auth/auth.service";
import { showSuccessToast, showErrorToast } from "@/components/ui/toast";

export default function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

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

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError("");
      setSuccessMessage("");
      setIsSubmittingForm(true);

      const response = await registerUser(data);

      showSuccessToast("Account created successfully!");

      setTimeout(() => {
        router.push("/sign-in");
      }, 800);
    } catch (error) {
      showErrorToast("Email already exists!");
    } finally {
      setIsSubmittingForm(false);
    }
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

      {serverError ? (
        <p
          style={{
            margin: 0,
            fontFamily: "Manrope",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "14px",
            color: "#E53935",
          }}
        >
          {serverError}
        </p>
      ) : null}

      {successMessage ? (
        <p
          style={{
            margin: 0,
            fontFamily: "Manrope",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "14px",
            color: "#078834",
          }}
        >
          {successMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmittingForm}
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
          cursor: isSubmittingForm ? "not-allowed" : "pointer",
          opacity: isSubmittingForm ? 0.7 : 1,
        }}
      >
        {isSubmittingForm ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}