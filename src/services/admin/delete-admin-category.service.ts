import { apiClient } from "@/lib/api-client";

export async function deleteAdminCategory(categoryId: string) {
  const { data } = await apiClient.delete(`/categories/${categoryId}`);
  return data;
}