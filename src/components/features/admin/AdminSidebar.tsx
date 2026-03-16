"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ClipboardList, LogOut, X } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/context/AuthProvider";

const navItems = [
  {
    label: "Menu Items",
    href: "/admin/menu-items",
    icon: Menu,
    activeRoutes: ["/admin/menu-items", "/admin/categories"],
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ClipboardList,
    activeRoutes: ["/admin/orders"],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/sign-in");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="border-b border-[#E8E2D9] bg-[#FCFBF8] p-4 md:hidden">
        <button type="button" onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6 text-[#17352D]" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[256px] shrink-0 border-r border-[#E8E2D9] bg-[#FCFBF8] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:sticky md:translate-x-0`}
      >
        <div className="flex h-screen flex-col px-4 pb-4 pt-[19px]">
          {/* Logo */}
          <div className="mb-[38px] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/logo/ion_fast-food.png"
                alt="Foodio logo"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
              <span className="font-cormorant text-[20px] font-semibold text-[#17352D]">
                Foodio.
              </span>
            </div>

            {/* Close button for mobile */}
            <button
              type="button"
              className="md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5 text-[#17352D]" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.activeRoutes.some((route) =>
                pathname.startsWith(route)
              );

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex h-[36px] items-center rounded-[8px] px-3 transition ${
                    isActive ? "bg-[#17352D]" : "hover:bg-[#F4EFE8]"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isActive ? "text-white" : "text-[#7E7E7E]"
                    }`}
                    strokeWidth={1.8}
                  />

                  <span
                    className={`ml-3 text-[14px] font-medium ${
                      isActive ? "text-white" : "text-[#7E7E7E]"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Sign Out */}
          <div className="mt-auto border-t border-[#E8E2D9] pt-[17px]">
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-[36px] w-full items-center rounded-[8px] px-3 transition hover:bg-[#FFF1F1]"
            >
              <LogOut className="h-4 w-4 text-[#EF4444]" strokeWidth={1.8} />
              <span className="ml-3 text-[14px] font-medium text-[#EF4444]">
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}