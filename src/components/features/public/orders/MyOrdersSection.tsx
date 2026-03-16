import type { MyOrder } from "@/types/order.type";
import OrderCard from "./OrderCard";

export default function MyOrdersSection({ orders }: { orders: MyOrder[] }) {
  return (
    <section className="mx-auto w-full max-w-[1140px] px-6 pb-20 pt-14">
      <h1
        className="text-[48px] leading-none tracking-[-0.03em] text-[#18352F]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        My Orders
      </h1>

      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}