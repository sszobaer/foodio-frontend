import { serverGet } from "@/lib/api-server";
import type { MyOrder } from "@/types/order.type";

export async function getMyOrders(): Promise<MyOrder[]> {
    return serverGet<MyOrder[]>("/orders/my-orders");
}