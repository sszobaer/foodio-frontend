import type { MenuItem } from "@/types/home.type";
import FoodCard from "./FoodCard";

type Props = {
  items: MenuItem[];
};

export default function HomeFoodGrid({ items }: Props) {
  return (
    <section className="pt-[20px] lg:pt-[17px] pb-[60px] lg:pb-[86px]">
      <div className="mx-auto mt-12 lg:mt-20 flex max-w-[1280px] flex-wrap justify-center gap-x-[24px] lg:gap-x-[36px] gap-y-[40px] lg:gap-y-[46px] px-4 lg:px-6">
        {items.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}