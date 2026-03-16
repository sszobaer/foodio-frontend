import { apiClient } from "@/lib/api-client";
import type {
  CreateAdminMenuItemPayload,
  CreateAdminMenuItemResponse,
} from "@/types/admin/menu-item.type";

export async function createAdminMenuItem(
  payload: CreateAdminMenuItemPayload
): Promise<CreateAdminMenuItemResponse> {
  const formData = new FormData();

  formData.append("categoryId", payload.categoryId);
  formData.append("name", payload.name.trim());
  formData.append("description", payload.description.trim());
  formData.append("price", payload.price);
  formData.append("isAvailable", String(payload.isAvailable));
  formData.append("isActive", String(payload.isActive ?? true));

  if (payload.image) {
    formData.append("image", payload.image);
  }

  const { data } = await apiClient.post<CreateAdminMenuItemResponse>(
    "/menu-items",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}