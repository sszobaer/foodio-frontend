"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { deleteAdminCategory } from "@/services/admin/delete-admin-category.service";
import { showErrorToast, showSuccessToast } from "@/components/ui/toast";

interface Props {
  categoryId: string;
  name: string;
}

export default function DeleteCategoryButton({ categoryId, name }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete "${name}" category?`);
    if (!confirmed) return;

    try {
      setLoading(true);
      const response = await deleteAdminCategory(categoryId);

      showSuccessToast(response?.message || "Category deleted successfully");
      router.refresh();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete category";

      showErrorToast(Array.isArray(message) ? message[0] : String(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="text-[#F04438] transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Trash2 className="h-4 w-4" strokeWidth={1.8} />
    </button>
  );
}