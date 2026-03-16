import { apiClient } from "@/lib/api-client";
import type {
  CreateAdminCategoryPayload,
  CreateAdminCategoryResponse,
} from "@/types/admin/category.type";

export async function updateAdminCategory(
  categoryId: string,
  payload: CreateAdminCategoryPayload
): Promise<CreateAdminCategoryResponse> {
  const { data } = await apiClient.patch<CreateAdminCategoryResponse>(
    `/categories/${categoryId}`,
    {
      name: payload.name.trim(),
    }
  );

  return data;
}