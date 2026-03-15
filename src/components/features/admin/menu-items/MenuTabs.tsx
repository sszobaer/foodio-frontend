import Link from "next/link";

type TabValue = "menu-items" | "categories";

interface Props {
  value: TabValue;
}

const tabs: { label: string; value: TabValue; href: string }[] = [
  { label: "Menu Items", value: "menu-items", href: "/admin/menu-items" },
  { label: "Categories", value: "categories", href: "/admin/categories" },
];

export default function MenuTabs({ value }: Props) {
  return (
    <div className="flex h-[36px] w-[202px] items-center rounded-[16px] bg-[#F3F0EA] px-[3.5px]">
      {tabs.map((tab) => {
        const isActive = value === tab.value;

        return (
          <Link
            key={tab.value}
            href={tab.href}
            className={[
              "flex h-[29px] w-[97.5px] items-center justify-center rounded-[12px] border px-[3px] py-1",
              "text-center text-[14px] font-medium leading-5 tracking-[-0.15px]",
              isActive
                ? "border-[#E7E1D7] bg-white text-[#1F1F1F]"
                : "border-transparent bg-transparent text-[#2E2E2E]",
            ].join(" ")}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
