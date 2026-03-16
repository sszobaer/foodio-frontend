"use client";

import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import AdminDataTable, {
  type AdminTableColumn,
} from "@/components/features/admin/shared/AdminDataTable";
import AvailabilityBadge from "@/components/features/admin/shared/AvailabilityBadge";
import MenuItemModal from "@/components/features/admin/menu-items/ItemModal";

import { deleteMenuItem } from "@/services/admin/delete-menu-item.service";

import type {
  AdminCategory,
  AdminMenuItem,
} from "@/types/admin/menu-item.type";

interface Props {
  menuItems: AdminMenuItem[];
  categories: AdminCategory[];
}

export default function MenuItemsTable({ menuItems, categories }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminMenuItem | null>(null);

  const router = useRouter();

  const columns: AdminTableColumn<AdminMenuItem>[] = useMemo(
    () => [
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
        render: (row) => (
          <div className="flex items-center gap-3">
            {/* Edit */}
            <button
              type="button"
              onClick={() => {
                setSelectedItem(row);
                setEditOpen(true);
              }}
              className="text-[#8A8A8A] transition hover:text-[#17352D]"
            >
              <Pencil className="h-4 w-4" strokeWidth={1.8} />
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={async () => {
                const confirmDelete = confirm(
                  "Are you sure you want to delete this menu item?"
                );

                if (!confirmDelete) return;

                try {
                  await deleteMenuItem(row.id);

                  toast.success("Menu item deleted successfully");

                  router.refresh();
                } catch (error: any) {
                  toast.error(
                    error?.response?.data?.message ||
                      "Failed to delete menu item"
                  );
                }
              }}
              className="text-[#F04438] transition hover:opacity-80"
            >
              <Trash2 className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>
        ),
      },
    ],
    [router]
  );

  return (
    <>
      <AdminDataTable
        columns={columns}
        data={menuItems}
        rowKey={(row) => row.id}
        emptyText="No menu items found."
      />

      {selectedItem ? (
        <MenuItemModal
          mode="edit"
          open={editOpen}
          onClose={() => {
            setEditOpen(false);
            setSelectedItem(null);
          }}
          categories={categories}
          item={selectedItem}
        />
      ) : null}
    </>
  );
}