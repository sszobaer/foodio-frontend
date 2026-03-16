import type { MenuItem } from "@/types/home.type";
import FoodCard from "./FoodCard";

type Props = {
  items: MenuItem[];
};

export default function HomeFoodGrid({ items }: Props) {
  return (
    <section className="pt-[78px] pb-[86px]">
      <div className="mx-auto mt-20 flex max-w-[1280px] flex-wrap justify-center gap-x-[36px] gap-y-[46px] px-6">
        {items.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}