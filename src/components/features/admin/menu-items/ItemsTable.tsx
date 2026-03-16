"use client";

import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import AdminDataTable, {
  type AdminTableColumn,
} from "@/components/features/admin/shared/AdminDataTable";
import AvailabilityBadge from "@/components/features/admin/shared/AvailabilityBadge";
import MenuItemModal from "@/components/features/admin/menu-items/ItemModal";
import type { AdminCategory, AdminMenuItem } from "@/types/admin/menu-item.type";

interface Props {
  menuItems: AdminMenuItem[];
  categories: AdminCategory[];
}

export default function MenuItemsTable({ menuItems, categories }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminMenuItem | null>(null);

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

            <button
              type="button"
              className="text-[#F04438] transition hover:opacity-80"
            >
              <Trash2 className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>
        ),
      },
    ],
    []
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