"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthInput from "./AuthInput";
import { loginSchema, type LoginFormData } from "@/schemas/auth/login.schema";
import { loginUser } from "@/services/auth/auth.service";
import { useAuth } from "@/context/AuthProvider";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { setAccessToken } from "@/utils/cookies";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [serverError, setServerError] = useState("");
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

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

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError("");
      setIsSubmittingForm(true);

      const res = await loginUser(data);

      if (res?.accessToken) {
        setAccessToken(res.accessToken);
      }

      showSuccessToast("Login Successful!");

      const me = await refreshUser();

      if (me?.role === "ADMIN") {
        router.replace("/admin");
        router.refresh();
      } else {
        router.push("/");
      }
    } catch (error) {
      setServerError("Invalid credentials");
      showErrorToast("Invalid Credentials");
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
        {isSubmittingForm ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}