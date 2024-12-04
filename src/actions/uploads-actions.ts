"use server";

import { db } from "@/db";
import { blogs } from "@/db/schema";
import getSession from "@/lib/getSession";
import { and, eq } from "drizzle-orm";

export const uploadFavicon = async (url: string, blogSlug: string) => {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) throw new Error("Unauthorized");

  try {
    await db
      .update(blogs)
      .set({ favicon: url })
      .where(eq(blogs.slug, blogSlug));

    console.log("Uploaded successfully!");

    return { success: true, message: "Favicon uploaded successfully!", url };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to upload favicon!" };
  }
};

export const uploadOpenGraph = async (url: string, blogSlug: string) => {
  const session = await getSession();
  const user = session?.user;

  try {
    await db
      .update(blogs)
      .set({ openGraph: url })
      .where(eq(blogs.slug, blogSlug));
    return { success: true, message: "Favicon uploaded successfully!", url };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to upload OpenGraph image!" };
  }
};

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
