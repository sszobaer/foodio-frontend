import { apiClient } from "@/lib/api-client";
import type {
  UpdateAdminMenuItemPayload,
  UpdateAdminMenuItemResponse,
} from "@/types/admin/menu-item.type";

export async function updateAdminMenuItem(
  menuId: string,
  payload: UpdateAdminMenuItemPayload
): Promise<UpdateAdminMenuItemResponse> {
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

  const { data } = await apiClient.put<UpdateAdminMenuItemResponse>(
    `/menu-items/${menuId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}