"use client";

import type { MyOrder, MyOrderStatus } from "@/types/order.type";

const ORDER_STEPS: MyOrderStatus[] = [
  "PENDING",
  "PREPARING",
  "READY",
  "COMPLETED",
];

function formatMoney(value: string | number) {
  const amount = Number(value || 0);
  return `$${amount.toFixed(2)}`;
}

function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatPlacedAt(value: string) {
  const date = new Date(value);

  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `Placed on ${month} ${day}${getDaySuffix(day)}, ${year} at ${time}`;
}

function getStatusLabel(status: MyOrderStatus) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function getStatusBadgeStyle(status: MyOrderStatus) {
  switch (status) {
    case "COMPLETED":
      return { color: "#22A35A", backgroundColor: "#EAF8EF" };
    case "READY":
      return { color: "#0F766E", backgroundColor: "#E7F7F5" };
    case "PREPARING":
      return { color: "#C67A00", backgroundColor: "#FFF4DA" };
    case "CANCELLED":
      return { color: "#DC2626", backgroundColor: "#FEECEC" };
    case "PENDING":
    default:
      return { color: "#C67A00", backgroundColor: "#FFF4DA" };
  }
}

function getActiveStepIndex(status: MyOrderStatus) {
  switch (status) {
    case "PENDING":
      return 0;
    case "PREPARING":
      return 1;
    case "READY":
      return 2;
    case "COMPLETED":
      return 3;
    default:
      return 0;
  }
}

export default function OrderCard({ order }: { order: MyOrder }) {
  const activeStepIndex = getActiveStepIndex(order.status);
  const badgeStyle = getStatusBadgeStyle(order.status);

  return (
    <div className="rounded-[16px] border border-[#E7E0D4] bg-[#FCFBF8] px-[18px] py-[18px] md:px-[20px] md:py-[20px]">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-[16px] font-semibold leading-none text-[#18352F]">
            Order #{order.orderNumber}
          </h2>
          <p className="mt-2 text-[13px] leading-none text-[#8A8F98]">
            {formatPlacedAt(order.placedAt)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-[16px] font-semibold text-[#222222]">
            {formatMoney(order.total)}
          </p>

          <span
            className="inline-flex h-[28px] items-center rounded-[8px] px-3 text-[12px] font-medium"
            style={badgeStyle}
          >
            {getStatusLabel(order.status)}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[12px] uppercase tracking-[0.04em] text-[#8A8F98]">
          ITEMS
        </p>

        <div className="mt-3 space-y-2">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4"
            >
              <p className="text-[14px] text-[#2F2F2F]">
                {item.quantity}x {item.itemName}
              </p>
              <p className="text-[14px] text-[#8A8F98]">
                {formatMoney(item.lineTotal)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-[#E7E0D4] pt-3">
        <div className="flex items-center justify-end">
          <p className="text-[14px] font-semibold text-[#222222]">
            Total Amount : {formatMoney(order.total)}
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-[#E7E0D4] pt-3">
        <p className="text-[14px] text-[#2F2F2F]">
          <span className="font-medium text-[#2F2F2F]">Delivering to:</span>{" "}
          <span className="text-[#8A8F98]">{order.deliveryAddress}</span>
        </p>
      </div>

      {order.status !== "CANCELLED" ? (
        <div className="mx-auto mt-12 flex w-full max-w-[330px] items-start justify-between">
          {ORDER_STEPS.map((step, index) => {
            const isCompleted = index <= activeStepIndex;
            const isLast = index === ORDER_STEPS.length - 1;

            return (
              <div key={step} className="relative flex flex-1 flex-col items-center">
                {!isLast ? (
                  <div
                    className="absolute left-1/2 top-[4px] h-[2px] w-full"
                    style={{
                      backgroundColor:
                        index < activeStepIndex ? "#1E4A40" : "#E1E1E1",
                    }}
                  />
                ) : null}

                <div
                  className="relative z-10 h-[10px] w-[10px] rounded-full"
                  style={{
                    backgroundColor: isCompleted ? "#1E4A40" : "#E1E1E1",
                  }}
                />

                <p
                  className="mt-3 text-[9px] font-medium uppercase leading-none"
                  style={{
                    color: isCompleted ? "#1E4A40" : "#8A8F98",
                  }}
                >
                  {step}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}