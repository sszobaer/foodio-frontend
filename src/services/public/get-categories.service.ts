import { serverGet } from "@/lib/api-server";
import type { FoodCategory } from "@/types/home.type";

export async function getCategories(): Promise<FoodCategory[]> {
  return serverGet<FoodCategory[]>("/categories");
}