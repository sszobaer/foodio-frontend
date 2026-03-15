import { apiClient } from "@/lib/api-client";
import { serverGet } from "@/lib/api-server";
import type { AdminMenuItem } from "@/types/admin/menu-item.type";

export async function getAdminMenuItems(): Promise<AdminMenuItem[]> {
  const res = await serverGet<AdminMenuItem[]>("/menu-items/admin/all");
  return res;
}
