import { Beef, GlassWater, Soup, UtensilsCrossed } from "lucide-react";
import type { FoodCategory } from "@/types/home.type";
import CatCard from "./CatCard";

type Props = {
  categories: FoodCategory[];
  selectedCategorySlug: string;
  onSelectCategory: (slug: string) => void;
};

function getCategoryIcon(slug: string) {
  const key = slug.toLowerCase();

  if (key.includes("drink")) return <GlassWater className="h-[15px] w-[15px]" />;
  if (key.includes("rice")) return <Soup className="h-[15px] w-[15px]" />;
  if (key.includes("fast")) return <Beef className="h-[15px] w-[15px]" />;

  return <UtensilsCrossed className="h-[15px] w-[15px]" />;
}

export default function HomeCategories({
  categories,
  selectedCategorySlug,
  onSelectCategory,
}: Props) {
  return (
    <section className="pt-[78px]">
      <div className="text-center">
        <h2
          className="text-[31px] leading-none tracking-[-0.03em] text-[#1A3C34]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Curated Categories
        </h2>

        <p className="mt-[10px] text-[12px] text-[#6B7280]">
          Explore our diverse menu of culinary delights.
        </p>
      </div>

      <div className="mt-[26px] flex items-center justify-center gap-[14px]">
        {categories.slice(0, 4).map((category) => (
          <CatCard
            key={category.id}
            label={category.name}
            icon={getCategoryIcon(category.slug)}
            active={selectedCategorySlug === category.slug}
            onClick={() => onSelectCategory(category.slug)}
          />
        ))}
      </div>
    </section>
  );
}