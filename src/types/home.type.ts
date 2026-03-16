export interface FoodCategory {
  id: string;
  name: string;
  slug: string;
}

export interface MenuItemCategory {
  id: string;
  name: string;
  slug: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  isAvailable: boolean;
  isActive: boolean;
  category: MenuItemCategory;
  createdAt: string;
  updatedAt: string;
}