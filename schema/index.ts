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

export const BlogPostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  blogSlug: z.string().min(1, { message: "Blog slug is required" }),
  isNewsletter: z.boolean().optional(),
  image: z
    .string()
    .optional()
    .default("https://image.alhaymex.com/placeholder?shape=grid"),
});

export const blogFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  isNewsletter: z.boolean().optional(),
  image: z
    .string()
    .optional()
    .default("https://image.alhaymex.com/placeholder?shape=grid"),
});

export const AddWriterSchema = z.object({
  blogSlug: z.string().min(1, "Blog slug is required"),
  name: z.string().min(1, "Name is required"),
  avatar: z.string().optional(),
});

export const GetWritersSchema = z.object({
  blogSlug: z.string().min(1, "Blog slug is required"),
});

export type GetWritersInput = z.infer<typeof GetWritersSchema>;
export type AddWriterInput = z.infer<typeof AddWriterSchema>;
export type BlogPostSchema = z.infer<typeof BlogPostSchema>;
export type blogSchema = z.infer<typeof blogSchema>;
