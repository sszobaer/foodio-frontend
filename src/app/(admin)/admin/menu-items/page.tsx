import AddItemButton from "@/components/features/admin/menu-items/AddItemButton";
import MenuItemsTable from "@/components/features/admin/menu-items/ItemsTable";
import MenuTabs from "@/components/features/admin/menu-items/MenuTabs";
import { getAdminCategories } from "@/services/admin/get-admin-categories.service";
import { getAdminMenuItems } from "@/services/admin/get-admin-menu-items.service";

export default async function AdminMenuItemsPage() {
  const [menuItems, categories] = await Promise.all([
    getAdminMenuItems(),
    getAdminCategories(),
  ]);

  return (
    <div className="px-5 pt-4">
      <div className="mb-4 border-b border-[#E8E2D9] pb-3">
        <h1 className="font-cormorant font-heading text-[16px] font-semibold leading-6 text-[#1A3C34]">
          Menu Items
        </h1>
      </div>

      <div className="mb-3 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
        <MenuTabs value="menu-items" />
        <AddItemButton categories={categories} />
      </div>

      <div className="max-w-[1128px]">
        <MenuItemsTable menuItems={menuItems} categories={categories} />
      </div>
    </div>
  );
}