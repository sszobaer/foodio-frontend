"use client";

import { useMemo, useState } from "react";

import AdminDataTable, {
  type AdminTableColumn,
} from "@/components/features/admin/shared/AdminDataTable";
import { updateAdminOrderStatus } from "@/services/admin/update-admin-order-status.service";
import type { AdminOrder, AdminOrderStatus } from "@/types/admin/order.type";
import { formatOrderDate } from "@/utils/admin/dateformatter.util";
import { formatOrderTotal } from "@/utils/admin/format-order-total.util";
import OrderStatusDropdown from "./OrderStatusDropDown";
import OrderDetailsModal from "./OrderDetailsModal";

interface Props {
  initialOrders: AdminOrder[];
}

export default function AdminOrdersTable({ initialOrders }: Props) {
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleStatusChange = async (
    orderId: string,
    nextStatus: AdminOrderStatus
  ) => {
    const previousOrders = [...orders];

    setUpdatingOrderId(orderId);

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: nextStatus } : order
      )
    );

    try {
      await updateAdminOrderStatus(orderId, nextStatus);
    } catch (error) {
      console.error("Failed to update order status:", error);
      setOrders(previousOrders);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const columns = useMemo<AdminTableColumn<AdminOrder>[]>(
    () => [
      {
        key: "id",
        header: "Order ID",
        className: "w-[201px]",
        render: (row) => (
          <span className="inline-block max-w-[120px] truncate font-manrope text-[14px] font-semibold leading-[20px] tracking-[-0.15px] text-[#222222]">
            {row.id}
          </span>
        ),
      },
      {
        key: "date",
        header: "Date",
        className: "w-[200px]",
        render: (row) => (
          <span className="font-manrope text-[14px] font-semibold leading-[20px] tracking-[-0.15px] text-[#222222]">
            {formatOrderDate(row.createdAt)}
          </span>
        ),
      },
      {
        key: "customer",
        header: "Customer",
        className: "w-[200px]",
        render: (row) => (
          <span className="font-manrope text-[14px] font-semibold leading-[20px] tracking-[-0.15px] text-[#222222]">
            {row.customerName}
          </span>
        ),
      },
      {
        key: "total",
        header: "Total",
        className: "w-[200px]",
        render: (row) => (
          <span className="font-manrope text-[14px] font-semibold leading-[20px] tracking-[-0.15px] text-[#222222]">
            {formatOrderTotal(row.total)}
          </span>
        ),
      },
      {
        key: "status",
        header: "Status",
        className: "w-[200px]",
        render: (row) => (
          <OrderStatusDropdown
            value={row.status}
            disabled={updatingOrderId === row.id}
            onChange={(nextStatus) => handleStatusChange(row.id, nextStatus)}
          />
        ),
      },
      {
        key: "actions",
        header: "Actions",
        className: "w-[110px]",
        render: (row) => (
          <button
            type="button"
            onClick={() => setSelectedOrderId(row.id)}
            className="inline-flex h-8 items-center justify-center rounded-[6px] border border-[#E8E2D9] bg-[#F4EFE8] px-3 font-manrope text-[13px] font-medium leading-[20px] text-[#4F4F4F] transition hover:bg-[#EEE7DD]"
          >
            Details
          </button>
        ),
      },
    ],
    [orders, updatingOrderId]
  );

  return (
    <>
      <AdminDataTable
        columns={columns}
        data={orders}
        rowKey={(row) => row.id}
        emptyText="No orders found."
      />

      <OrderDetailsModal
        open={!!selectedOrderId}
        orderId={selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
      />
    </>
  );
}