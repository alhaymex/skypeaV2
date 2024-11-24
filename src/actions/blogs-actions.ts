"use server";

import { db } from "@/db";
import { blogSchema } from "../../schema";
import { blogComponents, blogs } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import getSession from "@/lib/getSession";
import { slugify } from "@/lib/slugify";
import { and, desc, eq } from "drizzle-orm";
import { ComponentData } from "@/types/types";

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

export const saveComponent = async (slug: string, component: ComponentData) => {
  const blog = await db
    .select()
    .from(blogs)
    .where(eq(blogs.slug, slug))
    .limit(1)
    .then((rows) => rows[0]);
  if (!blog) return { success: false, message: "Blog not found" };

  const lastComponent = await db
    .select()
    .from(blogComponents)
    .where(eq(blogComponents.blogId, blog.id as string))
    .orderBy(desc(blogComponents.order))
    .limit(1)
    .then((rows) => rows[0]);

  const newOrder = lastComponent ? lastComponent.order + 1 : 1;

  await db.insert(blogComponents).values({
    blogId: blog.id,
    type: component.type,
    order: newOrder,
    data: component.data,
  });

  return { success: true };
};
