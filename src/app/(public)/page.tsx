import HomeHero from "@/components/features/public/home/HomeHero";
import HomeMenuSection from "@/components/features/public/home/HomeMenuSection";
import Footer from "@/components/features/public/Footer";
import { getCategories } from "@/services/public/get-categories.service";
import { getMenuItems } from "@/services/public/get-menu-items.service";

export default async function Page() {
  const [categories, menuItems] = await Promise.all([
    getCategories(),
    getMenuItems({ isAvailable: true, sortBy: "price_asc" }),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1280px] px-[48px] pt-0">
        <HomeHero />
        <HomeMenuSection categories={categories} items={menuItems} />
      </div>
      <Footer />
    </main>
  );
}