import { AdminOrderStatus } from "@/types/admin/order.type";

export function formatOrderStatus(status: AdminOrderStatus) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}