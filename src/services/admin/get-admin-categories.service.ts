
import { apiClient } from "@/lib/api-client";
import { serverGet } from "@/lib/api-server";
import type { AdminCategory } from "@/types/admin/menu-item.type";

export async function getAdminCategories(): Promise<AdminCategory[]> {
  const res = await serverGet<AdminCategory[]>("/categories/admin/all");
  return res;
}
