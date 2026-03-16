export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminMenuItem {
  id: string;
  categoryId: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  isAvailable: boolean;
  isActive: boolean;
  category: AdminCategory;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdminMenuItemPayload {
  categoryId: string;
  name: string;
  description: string;
  price: string;
  isAvailable: boolean;
  isActive?: boolean;
  image?: File | null;
}

export interface CreateAdminMenuItemResponse {
  id: string;
  message: string;
}

export interface UpdateAdminMenuItemPayload {
  categoryId: string;
  name: string;
  description: string;
  price: string;
  isAvailable: boolean;
  isActive?: boolean;
  image?: File | null;
}

export interface UpdateAdminMenuItemResponse {
  id: string;
  message: string;
}