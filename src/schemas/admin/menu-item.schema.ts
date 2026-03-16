import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

const imageSchema = z
  .instanceof(File, { message: "Image is required" })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Image size must be maximum 2MB",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Only PNG and JPEG are supported",
  });

export function buildMenuItemFormSchema({
  requireImage,
}: {
  requireImage: boolean;
}) {
  return z.object({
    categoryId: z.string().trim().min(1, "Category is required"),
    name: z.string().trim().min(1, "Name is required"),
    description: z.string().trim().min(1, "Description is required"),
    price: z
      .string()
      .trim()
      .min(1, "Price is required")
      .refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, {
        message: "Enter a valid price",
      }),
    isAvailable: z.boolean(),
    image: requireImage ? imageSchema : imageSchema.optional(),
  });
}

export type MenuItemFormValues = {
  categoryId: string;
  name: string;
  description: string;
  price: string;
  isAvailable: boolean;
  image?: File;
};