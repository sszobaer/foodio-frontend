import { apiClient } from "@/lib/api-client";

export async function deleteMenuItem(id: string) {
  const res = await apiClient.delete(`/menu-items/${id}`);
  return res.data;
}