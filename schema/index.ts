import { z } from "zod";

export const blogSchema = z.object({
  name: z.string().min(3, {
    message: "Blog name must be at least 3 characters.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(300, {
      message: "Description must not exceed 300 characters.",
    }),
  icon: z.string({
    required_error: "Please select a blog icon.",
  }),
  category: z.string({
    required_error: "Please select a blog category.",
  }),
});

export type blogSchema = z.infer<typeof blogSchema>;
