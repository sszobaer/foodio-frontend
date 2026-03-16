import type { MyOrderStatus } from "@/types/order.type";

const statusMap: Record<
  MyOrderStatus,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
  }
> = {
  PENDING: {
    label: "Pending",
    bg: "#FFF7E8",
    text: "#A16207",
    border: "#F4D28C",
  },
  PREPARING: {
    label: "Preparing",
    bg: "#FFF3E8",
    text: "#C2410C",
    border: "#F7C9A8",
  },
  READY: {
    label: "Ready",
    bg: "#ECFDF3",
    text: "#027A48",
    border: "#ABEFC6",
  },
  COMPLETED: {
    label: "Completed",
    bg: "#ECFDF3",
    text: "#027A48",
    border: "#ABEFC6",
  },
  CANCELLED: {
    label: "Cancelled",
    bg: "#FEF3F2",
    text: "#B42318",
    border: "#FECDCA",
  },
};

export default function OrderStatusBadge({
  status,
}: {
  status: MyOrderStatus;
}) {
  const config = statusMap[status] ?? statusMap.PENDING;

  return (
    <span
      className="inline-flex items-center justify-center rounded-full border px-3 py-1 text-[12px] font-semibold tracking-[-0.01em]"
      style={{
        backgroundColor: config.bg,
        color: config.text,
        borderColor: config.border,
      }}
    >
      {config.label}
    </span>
  );
}