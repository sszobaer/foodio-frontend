import { apiClient } from "@/lib/api-client";
import type {
  AdminOrderStatus,
  UpdateAdminOrderStatusResponse,
} from "@/types/admin/order.type";

export async function updateAdminOrderStatus(
  orderId: string,
  status: AdminOrderStatus
): Promise<UpdateAdminOrderStatusResponse> {
  const res = await apiClient.patch<UpdateAdminOrderStatusResponse>(
    `/orders/${orderId}/status`,
    { status }
  );

  return res.data;
}