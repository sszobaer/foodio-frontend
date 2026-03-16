import { getMyOrders } from "@/services/public/get-my-orders.service";
import MyOrdersSection from "@/components/features/public/orders/MyOrdersSection";

export default async function MyOrdersPage() {
    const orders = await getMyOrders();
    return <MyOrdersSection orders={orders} />;
}