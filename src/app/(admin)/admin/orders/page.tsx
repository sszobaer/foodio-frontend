import AdminOrdersTable from "@/components/features/admin/orders/AdminOrdersTable";
import { getAdminOrders } from "@/services/admin/get-admin-orders.service";

export default async function OrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div className="px-5 pt-4">
      <div className="mb-4 border-b border-[#E8E2D9] pb-3">
        <h1 className="font-cormorant text-[16px] font-semibold leading-6 text-[#1A3C34]">
          Order Details
        </h1>
      </div>

      <AdminOrdersTable initialOrders={orders} />
    </div>
  );
}