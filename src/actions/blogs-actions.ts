"use server";

import { db } from "@/db";
import { blogSchema } from "../../schema";
import { blogComponents, blogs } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import getSession from "@/lib/getSession";
import { slugify } from "@/lib/slugify";
import { and, asc, desc, eq, gt, sql } from "drizzle-orm";
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

  const [newComponent] = await db
    .insert(blogComponents)
    .values({
      blogId: blog.id,
      type: component.type,
      order: newOrder,
      data: component.data,
    })
    .returning({ id: blogComponents.id });

  return { success: true, dbId: newComponent.id };
};

export const deleteComponent = async (slug: string, componentId: string) => {
  try {
    const blog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .limit(1)
      .then((rows) => rows[0]);

    if (!blog) {
      throw new Error("Blog not found");
    }

    const deletedComponent = await db
      .select()
      .from(blogComponents)
      .where(
        and(
          eq(blogComponents.blogId, blog.id),
          eq(blogComponents.id, componentId)
        )
      )
      .limit(1)
      .then((rows) => rows[0]);

    if (!deletedComponent) {
      throw new Error("Component not found");
    }

    await db
      .delete(blogComponents)
      .where(
        and(
          eq(blogComponents.blogId, blog.id),
          eq(blogComponents.id, componentId)
        )
      );

    await db
      .update(blogComponents)
      .set({
        order: sql`${blogComponents.order} - 1`,
      })
      .where(
        and(
          eq(blogComponents.blogId, blog.id),
          gt(blogComponents.order, deletedComponent.order)
        )
      );

    return { success: true };
  } catch (error) {
    console.error("Error deleting component:", error);
    return { success: false, error: "Failed to delete component" };
  }
};

export const getBlogComponents = async (slug: string) => {
  try {
    const blog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .limit(1)
      .then((rows) => rows[0]);

    if (!blog) {
      throw new Error("Blog not found");
    }

    const components = await db
      .select()
      .from(blogComponents)
      .where(eq(blogComponents.blogId, blog.id))
      .orderBy(asc(blogComponents.order));

    return components.map((component) => ({
      type: component.type,
      id: `${component.type}-${component.id}`,
      dbId: component.id,
      data: component.data,
    }));
  } catch (error) {
    console.error("Error fetching components:", error);
    throw new Error("Failed to fetch components");
  }
};

export const updateBlogSettings = async (
  slug: string,
  backgroundColor: string,
  fontFamily: string
): Promise<void> => {
  try {
    await db
      .update(blogs)
      .set({
        backgroundColor,
        fontFamily,
        updatedAt: new Date(),
      })
      .where(eq(blogs.slug, slug));
  } catch (error) {
    console.error("Error updating blog settings:", error);
    throw new Error("Failed to update blog settings");
  }
};

export const getBlogSettings = async (
  slug: string
): Promise<{ backgroundColor: string; fontFamily: string }> => {
  try {
    const blog = await db
      .select({
        backgroundColor: blogs.backgroundColor,
        fontFamily: blogs.fontFamily,
      })
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .limit(1)
      .then((rows) => rows[0]);

    if (!blog) {
      throw new Error(`Blog with slug ${slug} not found`);
    }

    return {
      backgroundColor: blog.backgroundColor,
      fontFamily: blog.fontFamily,
    };
  } catch (error) {
    console.error("Error fetching blog settings:", error);
    throw new Error("Failed to fetch blog settings");
  }
};
