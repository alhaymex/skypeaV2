"use server";

import { db } from "@/db";
import { blogSchema } from "../../schema";
import { blogs } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import getSession from "@/lib/getSession";
import { slugify } from "@/lib/slugify";
import { and, eq } from "drizzle-orm";

export const getBlogs = async () => {
  const session = await getSession();
  if (!session || !session.user || !session.user.id) return [];

  return await db.select().from(blogs).where(eq(blogs.userId, session.user.id));
};

export const createBlog = async (data: z.infer<typeof blogSchema>) => {
  try {
    const session = await getSession();

    if (!session || !session.user || !session.user.id)
      return { success: false, message: "User not authenticated" };

    const userId = session.user.id;
    const slug = await slugify(data.name);

    const blog = { ...data, slug, userId };

    await db.insert(blogs).values(blog);
    revalidatePath("/projects");

    return { success: true, message: "Blog created successfully" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: err.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      };
    }

    console.error("Error creating blog:", err);
    return { success: false, message: "Failed to create blog" };
  }
};

export const getBlogBySlug = async (slug: string) => {
  const session = await getSession();

  if (!session || !session.user || !session.user.id) {
    return { success: false, message: "User not authenticated" };
  }

  const blog = await db
    .select()
    .from(blogs)
    .where(and(eq(blogs.slug, slug), eq(blogs.userId, session.user.id)));

  return { success: true, data: blog[0] };
};

export const getUserProjects = async () => {
  const session = await getSession();

  if (!session || !session.user || !session.user.id) {
    return { success: false, message: "User not authenticated" };
  }

  const userBlogs = await db
    .select()
    .from(blogs)
    .where(eq(blogs.userId, session.user.id));

  return { success: true, data: userBlogs };
};
