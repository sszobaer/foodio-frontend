import { Pencil, Trash2 } from "lucide-react";

import AddCategoryButton from "@/components/features/admin/categories/AddCategoryButton";
import MenuTabs from "@/components/features/admin/menu-items/MenuTabs";
import AdminDataTable, {
  type AdminTableColumn,
} from "@/components/features/admin/shared/AdminDataTable";
import { getAdminCategories } from "@/services/admin/get-admin-categories.service";
import type { AdminCategory } from "@/types/admin/menu-item.type";
import EditCategoryButton from "@/components/features/admin/categories/EditCategoryButton";
import DeleteCategoryButton from "@/components/features/admin/categories/DeleteCAtegoryButton";

const columns: AdminTableColumn<AdminCategory>[] = [
  {
    key: "name",
    header: "Name",
    render: (row) => row.name,
  },
  {
  key: "actions",
  header: "Actions",
  className: "w-[110px]",
  render: (row) => (
    <div className="flex items-center justify-end gap-3">
      <EditCategoryButton categoryId={row.id} name={row.name} />
      <DeleteCategoryButton categoryId={row.id} name={row.name} />
    </div>
  ),
},
];

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();

  return (
    <div className="px-5 pt-4">
      <div className="mb-4 border-b border-[#E8E2D9] pb-3">
        <h1 className="font-heading text-[16px] font-semibold leading-6 text-[#17352D]">
          Categories
        </h1>
      </div>

      <div className="mb-3 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
        <MenuTabs value="categories" />
        <AddCategoryButton />
      </div>

      <div className="max-w-[1128px]">
        <AdminDataTable
          columns={columns}
          data={categories}
          rowKey={(row) => row.id}
          emptyText="No categories found."
        />
      </div>
    </div>
  );
}