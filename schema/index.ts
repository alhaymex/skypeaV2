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
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be 100 characters or less"),
  description: z
    .string()
    .max(500, "Description must be 500 characters or less")
    .optional(),
  content: z.string().min(1, "Content is required"),
  publishOption: z.enum(["draft", "published", "scheduled"]),
  scheduledTime: z.string().optional(),
  isDistributed: z.boolean().default(false),
  blogSlug: z.string().min(1, "Blog slug is required"),
});

export const blogFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be 100 characters or less"),
  description: z
    .string()
    .max(500, "Description must be 500 characters or less")
    .optional(),
  content: z.string().min(1, "Content is required"),
  publishOption: z.enum(["draft", "published", "scheduled"]),
  scheduledTime: z.string().optional(),
  isDistributed: z.boolean().default(false),
});

export type BlogPostSchema = z.infer<typeof BlogPostSchema>;
export type blogSchema = z.infer<typeof blogSchema>;
