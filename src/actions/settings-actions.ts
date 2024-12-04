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
  description: string,
  timeZone: string
) => {
  console.log(description, timeZone);
};
