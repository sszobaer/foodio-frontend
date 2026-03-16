"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";

import { adminCategorySchema } from "@/schemas/admin/category.schema";
import { createAdminCategory } from "@/services/admin/create-admin-category.service";
import { updateAdminCategory } from "@/services/admin/update-admin-category.service";
import { showErrorToast, showSuccessToast } from "@/components/ui/toast";

interface Props {
  open: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  categoryId?: string;
  initialName?: string;
}

export default function CategoryModal({
  open,
  onClose,
  mode = "create",
  categoryId,
  initialName = "",
}: Props) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEdit = mode === "edit";

  const title = useMemo(
    () => (isEdit ? "Edit Category" : "Add Category"),
    [isEdit]
  );

  const buttonText = useMemo(
    () => (isEdit ? "Update" : "Add"),
    [isEdit]
  );

  useEffect(() => {
    if (!open) return;

    setName(initialName || "");
    setError("");

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose, initialName]);

  if (!open) return null;

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const parsed = adminCategorySchema.safeParse({ name });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Name is required");
      return;
    }

    try {
      setIsSubmitting(true);

      if (isEdit) {
        if (!categoryId) {
          showErrorToast("Category id is missing");
          return;
        }

        const response = await updateAdminCategory(categoryId, {
          name: parsed.data.name,
        });

        showSuccessToast(response.message || "Category updated successfully");
      } else {
        const response = await createAdminCategory({
          name: parsed.data.name,
        });

        showSuccessToast(response.message || "Category created successfully");
      }

      onClose();
      router.refresh();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        (isEdit ? "Failed to update category" : "Failed to create category");

      showErrorToast(Array.isArray(message) ? message[0] : String(message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/35">
      <div className="absolute inset-0" onClick={handleClose} aria-hidden="true" />

      <div className="relative flex min-h-screen items-start justify-center px-3 py-6 sm:px-4 sm:pt-[82px]">
        <div
          className="relative w-full max-w-[512px] rounded-[12px] border border-[#E4DED2] bg-white shadow-[0px_10px_30px_rgba(0,0,0,0.18)]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-[#9A9A9A] transition hover:opacity-80 sm:right-[24px] sm:top-[24px]"
          >
            <X className="h-5 w-5 stroke-[1.8]" />
          </button>

          <div className="px-4 pb-5 pt-5 sm:px-[25px] sm:pb-6 sm:pt-[25px]">
            <h2 className="pr-10 text-[24px] font-semibold leading-none text-[#17352D]">
              {title}
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 sm:mt-[28px]">
              <div className="w-full sm:w-[462px]">
                <label
                  htmlFor="category-name"
                  className="mb-2 block text-[16px] font-medium leading-none text-[#222222] sm:mb-[8px]"
                >
                  Name
                </label>

                <input
                  id="category-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError("");
                  }}
                  className={`h-[36px] w-full rounded-[6px] border bg-white px-3 text-[14px] text-[#17352D] outline-none ${
                    error
                      ? "border-[#FF5A52] focus:border-[#FF5A52]"
                      : "border-[#D8D1C4] focus:border-[#17352D]"
                  }`}
                />

                <div className="mt-2 min-h-[20px]">
                  {error ? (
                    <p className="text-[12px] leading-4 text-[#FF5A52]">
                      {error}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 flex w-full justify-end sm:mt-[28px] sm:w-[462px]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-[36px] min-w-[64px] items-center justify-center gap-2 rounded-[46px] bg-[#17352D] px-4 py-2 text-[14px] font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {buttonText}
                    </>
                  ) : (
                    buttonText
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}