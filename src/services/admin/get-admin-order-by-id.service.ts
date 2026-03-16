import { apiClient } from "@/lib/api-client";
import type { AdminOrderDetails } from "@/types/admin/order.type";

export async function getAdminOrderById(
  orderId: string
): Promise<AdminOrderDetails> {
  const res = await apiClient.get<AdminOrderDetails>(`/orders/${orderId}`);
  return res.data;
}