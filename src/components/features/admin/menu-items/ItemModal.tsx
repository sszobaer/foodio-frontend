"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Loader2, X } from "lucide-react";

import MenuItemField, {
    getMenuItemInputClassName,
} from "./ItemField";
import MenuItemCategorySelect from "./ItemCategorySelect";
import MenuItemImageField from "./ItemImageField";
import MenuItemAvailabilityToggle from "./ItemAvailabilityToggle";

import {
    buildMenuItemFormSchema,
    type MenuItemFormValues,
} from "@/schemas/admin/menu-item.schema";
import { createAdminMenuItem } from "@/services/admin/create-admin-menu-item.service";
import { updateAdminMenuItem } from "@/services/admin/update-admin-menu-item.service";
import { showErrorToast, showSuccessToast } from "@/components/ui/toast";
import type { AdminCategory, AdminMenuItem } from "@/types/admin/menu-item.type";

interface Props {
    mode: "create" | "edit";
    open: boolean;
    onClose: () => void;
    categories: AdminCategory[];
    item?: AdminMenuItem;
}

function getDefaultValues(
    mode: "create" | "edit",
    categories: AdminCategory[],
    item?: AdminMenuItem
): MenuItemFormValues {
    if (mode === "edit" && item) {
        return {
            categoryId: item.categoryId,
            name: item.name,
            description: item.description,
            price: item.price,
            isAvailable: item.isAvailable,
        };
    }

    return {
        categoryId: categories[0]?.id ?? "",
        name: "",
        description: "",
        price: "",
        isAvailable: true,
    };
}

function getImageNameFromUrl(imageUrl?: string) {
    if (!imageUrl) return "";

    try {
        const fileName = imageUrl.split("/").pop() ?? "";
        return decodeURIComponent(fileName);
    } catch {
        return imageUrl.split("/").pop() ?? "";
    }
}

export default function MenuItemModal({
    mode,
    open,
    onClose,
    categories,
    item,
}: Props) {
    const router = useRouter();

    const defaultValues = useMemo(
        () => getDefaultValues(mode, categories, item),
        [mode, categories, item]
    );

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<MenuItemFormValues>({
        defaultValues,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [hasRemovedExistingImage, setHasRemovedExistingImage] = useState(false);

    const isAvailable = watch("isAvailable");

    const existingImageName =
        mode === "edit" ? getImageNameFromUrl(item?.imageUrl) : "";

    const showUploadArea =
        mode === "create" || hasRemovedExistingImage || Boolean(selectedFile) || !existingImageName;

    const imageIsRequired =
        mode === "create"
            ? !selectedFile
            : hasRemovedExistingImage && !selectedFile;

    useEffect(() => {
        if (!open) return;

        reset(defaultValues);
        setSelectedFile(null);
        setHasRemovedExistingImage(false);
        clearErrors();

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open, reset, defaultValues, clearErrors, onClose]);

    if (!open) return null;

    const handleClose = () => {
        if (isSubmitting) return;
        onClose();
    };

    const submit = async (values: MenuItemFormValues) => {
        clearErrors();

        const schema = buildMenuItemFormSchema({
            requireImage: imageIsRequired,
        });

        const parsed = schema.safeParse({
            ...values,
            image: selectedFile ?? undefined,
        });

        if (!parsed.success) {
            parsed.error.issues.forEach((issue) => {
                const fieldName = String(issue.path[0]) as keyof MenuItemFormValues;
                setError(fieldName, {
                    type: "manual",
                    message: issue.message,
                });
            });
            return;
        }

        try {
            setIsSubmitting(true);

            if (mode === "create") {
                const response = await createAdminMenuItem({
                    categoryId: parsed.data.categoryId,
                    name: parsed.data.name,
                    description: parsed.data.description,
                    price: parsed.data.price,
                    isAvailable: parsed.data.isAvailable,
                    isActive: true,
                    image: selectedFile,
                });

                showSuccessToast(response.message || "Menu item created successfully");
            } else {
                if (!item?.id) {
                    showErrorToast("Menu item id is missing");
                    return;
                }

                const response = await updateAdminMenuItem(item.id, {
                    categoryId: parsed.data.categoryId,
                    name: parsed.data.name,
                    description: parsed.data.description,
                    price: parsed.data.price,
                    isAvailable: parsed.data.isAvailable,
                    isActive: true,
                    image: selectedFile,
                });

                showSuccessToast(response.message || "Menu item updated successfully");
            }

            onClose();
            router.refresh();
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                `Failed to ${mode === "create" ? "create" : "update"} menu item`;

            showErrorToast(Array.isArray(message) ? message[0] : String(message));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-black/35 p-3 sm:p-4">
            <div className="absolute inset-0" onClick={handleClose} aria-hidden="true" />

            <div className="relative mx-auto flex min-h-full items-center justify-center">
                <div
                    className="relative z-10 max-h-[92vh] w-full max-w-[694px] overflow-y-auto rounded-[18px] border border-[#E6E2D8] bg-[#FFFEFC] shadow-[0px_16px_40px_rgba(16,24,25,0.18)]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="px-5 pb-5 pt-5 sm:px-8 sm:pb-8 sm:pt-7">
                        <div className="mb-5 flex items-start justify-between sm:mb-6">
                            <h2 className="text-[28px] font-semibold leading-none text-[#17352D] sm:text-[24px]">
                                {mode === "create" ? "Add New Item" : "Edit Item"}
                            </h2>

                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[#999999] transition hover:bg-[#F4F1EA]"
                            >
                                <X className="h-5 w-5" strokeWidth={1.8} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(submit)} className="space-y-5">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                                <MenuItemField label="Name" error={errors.name?.message}>
                                    <input
                                        type="text"
                                        {...register("name")}
                                        className={getMenuItemInputClassName(errors.name?.message)}
                                    />
                                </MenuItemField>

                                <MenuItemField label="Price" error={errors.price?.message}>
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        {...register("price")}
                                        className={getMenuItemInputClassName(errors.price?.message)}
                                    />
                                </MenuItemField>
                            </div>

                            <MenuItemField label="Category" error={errors.categoryId?.message}>
                                <Controller
                                    name="categoryId"
                                    control={control}
                                    render={({ field }) => (
                                        <MenuItemCategorySelect
                                            value={field.value ?? ""}
                                            categories={categories}
                                            error={errors.categoryId?.message}
                                            onChange={(value) => {
                                                field.onChange(value);
                                                clearErrors("categoryId");
                                            }}
                                        />
                                    )}
                                />
                            </MenuItemField>

                            <MenuItemField label="Description" error={errors.description?.message}>
                                <textarea
                                    rows={4}
                                    {...register("description")}
                                    className={`min-h-[104px] w-full resize-none rounded-[8px] border bg-white px-4 py-3 text-[15px] font-medium text-[#1F1F1F] outline-none transition placeholder:text-[#B0B0B0] focus:border-[#17352D] ${errors.description?.message
                                            ? "border-[#E53935]"
                                            : "border-[#E8E2D9]"
                                        }`}
                                />
                            </MenuItemField>

                            <MenuItemImageField
                                mode={mode}
                                selectedFile={selectedFile}
                                existingImageName={existingImageName}
                                showUploadArea={showUploadArea}
                                error={errors.image?.message}
                                onFileSelect={(file) => {
                                    setSelectedFile(file);
                                    clearErrors("image");
                                }}
                                onRemoveExistingImage={() => {
                                    setHasRemovedExistingImage(true);
                                    clearErrors("image");
                                }}
                                onRemoveSelectedFile={() => {
                                    setSelectedFile(null);
                                }}
                            />

                            <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-end sm:justify-between">
                                <MenuItemAvailabilityToggle
                                    checked={Boolean(isAvailable)}
                                    onChange={(value) =>
                                        setValue("isAvailable", value, { shouldDirty: true })
                                    }
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting || categories.length === 0}
                                    className="inline-flex h-[48px] w-full items-center justify-center rounded-full bg-[#17352D] px-6 text-[15px] font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:h-[48px] sm:w-auto sm:min-w-[170px]"
                                >
                                    {isSubmitting ? (
                                        <span className="inline-flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Saving...
                                        </span>
                                    ) : (
                                        "Save Changes"
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