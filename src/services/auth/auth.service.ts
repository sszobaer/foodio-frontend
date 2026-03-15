import { apiClient } from "@/lib/api-client";
import type {
  RegisterPayload,
  LoginPayload,
  MeResponse,
  RegisterResponse,
  LoginResponse,
} from "@/types/auth.type";

export async function registerUser(payload: RegisterPayload) {
  const res = await apiClient.post<RegisterResponse>("/auth/register", payload);
  return res.data;
}

export async function loginUser(payload: LoginPayload) {
  const res = await apiClient.post<LoginResponse>("/auth/login", payload);
  return res.data;
}

export async function getMe() {
  const res = await apiClient.get<MeResponse>("/auth/me");
  return res.data;
}

export async function logoutUser() {
  const res = await apiClient.post<RegisterResponse>("/auth/logout");
  return res.data;
}
