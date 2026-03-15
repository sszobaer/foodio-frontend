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
