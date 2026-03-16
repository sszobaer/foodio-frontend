import { Pencil, Trash2 } from "lucide-react";

import MenuTabs from "@/components/features/admin/menu-items/MenuTabs";
import AdminDataTable, {
  type AdminTableColumn,
} from "@/components/features/admin/shared/AdminDataTable";
import AvailabilityBadge from "@/components/features/admin/shared/AvailabilityBadge";
import { getAdminMenuItems } from "@/services/admin/get-admin-menu-items.service";
import type { AdminMenuItem } from "@/types/admin/menu-item.type";

const columns: AdminTableColumn<AdminMenuItem>[] = [
  {
    key: "name",
    header: "Name",
    render: (row) => row.name,
  },
  {
    key: "category",
    header: "Category",
    render: (row) => row.category?.name ?? "-",
  },
  {
    key: "price",
    header: "Price",
    render: (row) => `$${Number(row.price).toFixed(2)}`,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <AvailabilityBadge active={row.isAvailable} />,
  },
  {
    key: "actions",
    header: "Actions",
    className: "w-[110px]",
    render: () => (
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="text-[#8A8A8A] transition hover:text-[#17352D]"
        >
          <Pencil className="h-4 w-4" strokeWidth={1.8} />
        </button>

        <button
          type="button"
          className="text-[#F04438] transition hover:opacity-80"
        >
          <Trash2 className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>
    ),
  },
];

export default async function AdminMenuItemsPage() {
  const menuItems = await getAdminMenuItems();

  return (
    <div className="px-5 pt-4">
      <div className="mb-4 border-b border-[#E8E2D9] pb-3">
        <h1 className="font-cormorant font-heading text-[16px] font-semibold leading-6 text-[#1A3C34]">
          Menu Items
        </h1>
      </div>

      <div className="mb-3 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">       
         <MenuTabs value="menu-items" />

        <button className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#17352D] px-4 text-[14px] font-medium leading-5 tracking-[-0.15px] text-white whitespace-nowrap">
          <span className="text-[16px] leading-none">+</span>
          Add Item
        </button>
      </div>

      <div className="max-w-[1128px]">
        <AdminDataTable
          columns={columns}
          data={menuItems}
          rowKey={(row) => row.id}
          emptyText="No menu items found."
        />
      </div>
    </div>
  );
}
