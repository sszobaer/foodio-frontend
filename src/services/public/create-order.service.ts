import { apiClient } from "@/lib/api-client";

type CreateOrderPayload = {
  items: Array<{
    menuItemId: string;
    quantity: number;
  }>;
  deliveryAddress: string;
};

export async function createOrder(payload: CreateOrderPayload) {
  const res = await apiClient.post("/orders", payload);
  return res.data;
}