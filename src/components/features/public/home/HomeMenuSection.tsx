"use client";

import { useMemo, useState } from "react";
import type { FoodCategory, MenuItem } from "@/types/home.type";
import HomeCategories from "./HomeCategories";
import HomeFoodGrid from "./HomeFoodGrid";

type Props = {
  categories: FoodCategory[];
  items: MenuItem[];
};

export default function HomeMenuSection({ categories, items }: Props) {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(
    categories[0]?.slug ?? ""
  );

  const filteredItems = useMemo(() => {
    if (!selectedCategorySlug) return items;

    return items.filter((item) => item.category?.slug === selectedCategorySlug);
  }, [items, selectedCategorySlug]);

  return (
    <>
      <HomeCategories
        categories={categories}
        selectedCategorySlug={selectedCategorySlug}
        onSelectCategory={setSelectedCategorySlug}
      />
      <HomeFoodGrid items={filteredItems} />
    </>
  );
}