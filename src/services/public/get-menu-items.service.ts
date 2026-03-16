import { serverGet } from "@/lib/api-server";
import type { MenuItem } from "@/types/home.type";

type GetMenuItemsParams = {
  category?: string;
  isAvailable?: boolean;
  sortBy?: string;
  search?: string;
};

function buildQuery(params?: GetMenuItemsParams) {
  if (!params) return "";

  const query = new URLSearchParams();

  if (params.category) query.set("category", params.category);
  if (typeof params.isAvailable === "boolean") {
    query.set("isAvailable", String(params.isAvailable));
  }
  if (params.sortBy) query.set("sortBy", params.sortBy);
  if (params.search) query.set("search", params.search);

  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export async function getMenuItems(
  params?: GetMenuItemsParams
): Promise<MenuItem[]> {
  return serverGet<MenuItem[]>(`/menu-items${buildQuery(params)}`);
}