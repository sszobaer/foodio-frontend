"use client";

import React from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, type = "text", placeholder, error, ...props }, ref) => {
    return (
      <div
        className="flex flex-col"
        style={{
          width: "398px",
          minHeight: "58px",
          gap: "8px",
        }}
      >
        <label
          style={{
            fontFamily: "Manrope",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "14px",
            letterSpacing: "-0.15px",
            color: "#202020",
            margin: 0,
          }}
        >
          {label}
        </label>

        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="outline-none"
          style={{
            width: "398px",
            height: "36px",
            padding: "4px 12px",
            borderRadius: "6px",
            border: error ? "1px solid #E53935" : "1px solid #DDD6CC",
            background: "#FFFFFF",
            fontFamily: "Manrope",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "14px",
            letterSpacing: "-0.15px",
            color: "#202020",
            boxSizing: "border-box",
          }}
          {...props}
        />

        {error ? (
          <p
            style={{
              margin: 0,
              fontFamily: "Manrope",
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "14px",
              letterSpacing: "-0.1px",
              color: "#E53935",
            }}
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;