import { getMyOrders } from "@/services/public/get-my-orders.service";
import MyOrdersSection from "@/components/features/public/orders/MyOrdersSection";


import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const cookieStore = await cookies();   // <-- FIX
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/sign-in");
  }
const orders = await getMyOrders();
    return <MyOrdersSection orders={orders} />;
}