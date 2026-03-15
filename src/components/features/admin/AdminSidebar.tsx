"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ClipboardList, LogOut } from "lucide-react";

import { useAuth } from "@/context/AuthProvider";

const navItems = [
  {
    label: "Menu Items",
    href: "/admin/menu-items",
    icon: Menu,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ClipboardList,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/sign-in");
  };

  return (
    <aside className="flex min-h-screen w-[256px] shrink-0 border-r border-[#E8E2D9] bg-[#FCFBF8] pr-[1px]">
      <div className="flex min-h-screen w-full flex-col px-4 pb-4 pt-[19px]">
        <div className="mb-[38px] flex items-center gap-2">
          <Image
            src="/logo/ion_fast-food.png"
            alt="Foodio logo"
            width={24}
            height={24}
            className="h-6 w-6 shrink-0 object-contain"
          />
          <span className="font-heading text-[20px] font-semibold leading-none text-[#17352D]">
            Foodio.
          </span>
        </div>

        <div className="flex h-full flex-1 flex-col justify-between">
          <div className="flex h-[809px] w-[223px] flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex h-[36px] w-[223px] items-center rounded-[8px] px-3 ${
                    isActive ? "bg-[#17352D]" : "bg-transparent hover:bg-[#F4EFE8]"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      isActive ? "text-white" : "text-[#7E7E7E]"
                    }`}
                    strokeWidth={1.8}
                  />
                  <span
                    className={`ml-3 text-[14px] font-medium leading-5 ${
                      isActive ? "text-white" : "text-[#7E7E7E]"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="w-[223px] border-t border-[#E8E2D9] pt-[17px]">
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-[36px] w-[223px] items-center rounded-[8px] px-3 hover:bg-[#FFF1F1]"
            >
              <LogOut
                className="h-4 w-4 shrink-0 text-[#EF4444]"
                strokeWidth={1.8}
              />
              <span className="ml-3 text-[14px] font-medium leading-5 text-[#EF4444]">
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}