import { z } from "zod";

export const adminCategorySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
});

export type AdminCategoryFormValues = z.infer<typeof adminCategorySchema>;