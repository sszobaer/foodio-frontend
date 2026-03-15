import { headers } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function serverGet<T>(endpoint: string): Promise<T> {
  const headerStore = await headers();
  const cookieHeader = headerStore.get("cookie") ?? "";

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}