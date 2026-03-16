import Footer from "@/components/features/public/Footer";
import FoodMenuClient from "@/components/features/public/food-menu/FoodMenuClient";
import { getCategories } from "@/services/public/get-categories.service";
import { getMenuItems } from "@/services/public/get-menu-items.service";

type SearchParams = {
  category?: string;
  search?: string;
  sortBy?: string;
  isAvailable?: string;
};

export default async function FoodMenuPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const category = params.category || "";
  const search = params.search || "";
  const sortBy = params.sortBy || "";
  const isAvailable =
    params.isAvailable === "true"
      ? true
      : params.isAvailable === "false"
      ? false
      : undefined;

  const [categories, items] = await Promise.all([
    getCategories(),
    getMenuItems({
      category: category || undefined,
      search: search || undefined,
      sortBy: sortBy || undefined,
      isAvailable,
    }),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1280px] px-[48px] pt-0">
        <FoodMenuClient
          categories={categories}
          items={items}
          initialCategory={category}
          initialSearch={search}
          initialSortBy={sortBy}
          initialIsAvailable={isAvailable}
        />
      </div>

      <Footer />
    </main>
  );
}