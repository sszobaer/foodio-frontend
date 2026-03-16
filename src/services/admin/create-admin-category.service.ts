import { apiClient } from "@/lib/api-client";
import type {
  CreateAdminCategoryPayload,
  CreateAdminCategoryResponse,
} from "@/types/admin/category.type";

export async function createAdminCategory(
  payload: CreateAdminCategoryPayload
): Promise<CreateAdminCategoryResponse> {
  const { data } = await apiClient.post<CreateAdminCategoryResponse>(
    "/categories",
    {
      name: payload.name.trim(),
    }
  );

  return data;
}