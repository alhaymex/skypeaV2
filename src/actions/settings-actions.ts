"use server";

import { db } from "@/db";
import { blogs } from "@/db/schema";
import getSession from "@/lib/getSession";
import { and, eq } from "drizzle-orm";

export const getBlogSettings = async (blogSlug: string) => {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) throw new Error("Unauthorized");

  try {
    const blog = await db
      .select({
        name: blogs.name,
        description: blogs.description,
        slug: blogs.slug,
        favicon: blogs.favicon,
        openGraph: blogs.openGraph,
      })
      .from(blogs)
      .where(and(eq(blogs.slug, blogSlug), eq(blogs.userId, user.id as string)))
      .limit(1);

    if (!blog) throw new Error("Blog not found");

    return {
      success: true,
      message: "Blog settings fetched successfully!",
      blog,
    };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to fetch blog settings!" };
  }
};

export const updateBlogGeneralSettings = async (
  blogSlug: string,
  description: string
) => {
  const session = await getSession();
  if (!session || !session.user?.id) {
    return { success: false, error: "Unauthorized!" };
  }

  const userId = session.user.id;

  try {
    const [blog] = await db
      .select()
      .from(blogs)
      .where(and(eq(blogs.userId, userId), eq(blogs.slug, blogSlug)));

    if (!blog) {
      return {
        success: false,
        error: "You do not have permission to update this blog.",
      };
    }

    const [updatedBlog] = await db
      .update(blogs)
      .set({
        description,
      })
      .where(eq(blogs.slug, blogSlug))
      .returning();

    return { success: true, data: updatedBlog };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update blog settings!" };
  }
};
