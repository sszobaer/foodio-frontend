export interface CreateAdminCategoryPayload {
  name: string;
}

export interface CreateAdminCategoryResponse {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  message?: string;
}