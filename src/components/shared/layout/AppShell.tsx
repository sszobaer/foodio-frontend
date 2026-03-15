"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthProvider";

export default function AppShell({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
