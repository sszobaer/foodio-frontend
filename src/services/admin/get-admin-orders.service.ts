import { serverGet } from "@/lib/api-server";
import type { AdminOrder } from "@/types/admin/order.type";

export async function getAdminOrders(): Promise<AdminOrder[]> {
  return serverGet<AdminOrder[]>("/orders");
}