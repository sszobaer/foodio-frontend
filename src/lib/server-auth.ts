import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { MeResponse } from "@/types/auth.type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getServerMe(): Promise<MeResponse | null> {
  try {
    const headerStore = await headers();
    const cookieHeader = headerStore.get("cookie") ?? "";

    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    return (await res.json()) as MeResponse;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getServerMe();

  if (!user) redirect("/sign-in");
  if (user.role !== "ADMIN") redirect("/");

  return user;
}
