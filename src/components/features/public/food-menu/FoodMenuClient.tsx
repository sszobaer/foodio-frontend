"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { FoodCategory, MenuItem } from "@/types/home.type";
import FoodCard from "@/components/features/public/home/FoodCard";

type Props = {
  categories: FoodCategory[];
  items: MenuItem[];
  initialCategory?: string;
  initialSearch?: string;
  initialSortBy?: string;
  initialIsAvailable?: boolean;
};

const SORT_OPTIONS = [
  { label: "Price Low to High", value: "price_asc" },
  { label: "Price High to Low", value: "price_desc" },
];

export default function FoodMenuClient({
  categories,
  items,
  initialCategory = "",
  initialSearch = "",
  initialSortBy = "",
  initialIsAvailable,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(initialSearch);
  const [showSortPanel, setShowSortPanel] = useState(false);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  const activeCategory = initialCategory;
  const activeSort = initialSortBy;
  const activeAvailable = initialIsAvailable;

  function buildQuery(next: {
    category?: string;
    search?: string;
    sortBy?: string;
    isAvailable?: boolean;
  }) {
    const params = new URLSearchParams(urlSearchParams.toString());

    if (next.category) params.set("category", next.category);
    else params.delete("category");

    if (next.search) params.set("search", next.search);
    else params.delete("search");

    if (next.sortBy) params.set("sortBy", next.sortBy);
    else params.delete("sortBy");

    if (typeof next.isAvailable === "boolean") {
      params.set("isAvailable", String(next.isAvailable));
    } else {
      params.delete("isAvailable");
    }

    return `${pathname}?${params.toString()}`;
  }

  function updateQuery(next: {
    category?: string;
    search?: string;
    sortBy?: string;
    isAvailable?: boolean;
  }) {
    startTransition(() => {
      router.replace(buildQuery(next), { scroll: false });
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== initialSearch) {
        updateQuery({
          category: activeCategory || "",
          search,
          sortBy: activeSort || "",
          isAvailable: activeAvailable,
        });
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderedCategories = useMemo(
    () => [{ id: "all", name: "All", slug: "" }, ...categories],
    [categories]
  );

  return (
    <section className="pt-[8px] pb-[86px]">
      <div className="pt-[14px] text-center">
        <h1
          className="text-[54px] leading-none tracking-[-0.04em] text-[#1A3C34]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Our Menu
        </h1>

        <p className="mt-[10px] text-[15px] text-[#6B7280]">
          Discover our selection of premium dishes, crafted with passion.
        </p>
      </div>

      <div className="mt-[34px] flex flex-col gap-[22px] lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-wrap items-center gap-[10px]">
          {renderedCategories.map((category) => {
            const isActive = activeCategory === category.slug;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  updateQuery({
                    category: category.slug,
                    search,
                    sortBy: activeSort || "",
                    isAvailable: activeAvailable,
                  })
                }
                className="inline-flex h-[34px] items-center rounded-full border px-[16px] text-[12px] font-medium transition"
                style={{
                  backgroundColor: isActive ? "#1A3C34" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#2F2F2F",
                  borderColor: isActive ? "#1A3C34" : "#E5DED3",
                }}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="flex items-start gap-[12px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-[14px] top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-[#8A8F98]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="h-[38px] w-[280px] rounded-full border border-[#E5DED3] bg-white pl-[38px] pr-[14px] text-[13px] text-[#1A3C34] outline-none placeholder:text-[#9AA0A8]"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSortPanel((prev) => !prev)}
              className="inline-flex h-[38px] items-center gap-[8px] rounded-full bg-[#1A3C34] px-[14px] text-[12px] font-medium text-white"
            >
              Sort
              <SlidersHorizontal className="h-[14px] w-[14px]" />
            </button>

            {showSortPanel ? (
              <div className="absolute right-0 top-[48px] z-30 w-[210px] rounded-[8px] border border-[#E5DED3] bg-white p-[12px] shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-[#2F2F2F]">
                    Sort by
                  </p>
                  <button
                    type="button"
                    className="text-[11px] text-[#8A8F98]"
                    onClick={() =>
                      updateQuery({
                        category: activeCategory || "",
                        search,
                        sortBy: "",
                        isAvailable: undefined,
                      })
                    }
                  >
                    Clear
                  </button>
                </div>

                <div className="mt-[14px] space-y-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#2F2F2F]">
                      Availability
                    </span>
                    <input
                      type="checkbox"
                      checked={activeAvailable === true}
                      onChange={(e) =>
                        updateQuery({
                          category: activeCategory || "",
                          search,
                          sortBy: activeSort || "",
                          isAvailable: e.target.checked ? true : undefined,
                        })
                      }
                    />
                  </div>

                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        updateQuery({
                          category: activeCategory || "",
                          search,
                          sortBy: option.value,
                          isAvailable: activeAvailable,
                        })
                      }
                      className="flex w-full items-center justify-between text-left text-[12px]"
                    >
                      <span className="text-[#2F2F2F]">{option.label}</span>
                      <span
                        className="flex h-[14px] w-[14px] items-center justify-center rounded-full border"
                        style={{
                          borderColor: "#C9CEC6",
                          backgroundColor:
                            activeSort === option.value ? "#1A3C34" : "white",
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <section className="pt-[52px]">
        {items.length === 0 ? (
          <div className="flex min-h-[280px] items-center justify-center rounded-[20px] border border-dashed border-[#E5DED3] bg-[#FAF7F2]">
            <p className="text-[15px] text-[#6B7280]">
              {isPending ? "Loading menu..." : "No menu items found."}
            </p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-[1280px] flex-wrap justify-center gap-x-[36px] gap-y-[58px]">
            {items.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}