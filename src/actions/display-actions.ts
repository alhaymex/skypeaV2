"use server";

import { db } from "@/db";
import {
  blogComponents,
  blogPages,
  blogs,
  posts,
  writers,
  postWriters,
  messages,
} from "@/db/schema";
import { BlogPageWithComponents } from "@/types/types";
import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getBlogForDisplay = async (slug: string) => {
  try {
    const rawBlogData = await db
      .select({
        blogId: blogs.id,
        blogName: blogs.name,
        blogSlug: blogs.slug,
        pageId: blogPages.id,
        pageName: blogPages.name,
        pageSlug: blogPages.slug,
        pageOrder: blogPages.order,
        componentId: blogComponents.id,
        componentType: blogComponents.type,
        componentOrder: blogComponents.order,
        componentData: blogComponents.data,
        backgroundColor: blogs.backgroundColor,
        fontFamily: blogs.fontFamily,
      })
      .from(blogs)
      .leftJoin(blogPages, eq(blogs.id, blogPages.blogId))
      .leftJoin(blogComponents, eq(blogPages.id, blogComponents.pageId))
      .where(eq(blogs.slug, slug))
      .orderBy(asc(blogPages.order), asc(blogComponents.order));

    if (rawBlogData.length === 0) {
      return { success: false, message: "Blog not found" };
    }

    const pagesMap = new Map<string, BlogPageWithComponents>();

    rawBlogData.forEach((row) => {
      if (row.pageId && !pagesMap.has(row.pageId)) {
        pagesMap.set(row.pageId, {
          id: row.pageId!,
          name: row.pageName!,
          slug: row.pageSlug!,
          order: row.pageOrder!,
          components: [],
        });
      }

      if (row.componentId) {
        const page = pagesMap.get(row.pageId!);
        if (page) {
          page.components.push({
            id: row.componentId!,
            type: row.componentType!,
            order: row.componentOrder!,
            data: row.componentData!,
          });
        }
      }
    });

    return {
      success: true,
      data: {
        id: rawBlogData[0].blogId!,
        name: rawBlogData[0].blogName!,
        slug: rawBlogData[0].blogSlug!,
        backgroundColor: rawBlogData[0].backgroundColor!,
        fontFamily: rawBlogData[0].fontFamily!,
        pages: Array.from(pagesMap.values()),
      },
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { success: false, message: "Failed to fetch blog" };
  }
};

export const getBlogPostsForDisplay = async (slug: string) => {
  // First, fetch all posts
  const blogs = await db
    .select()
    .from(posts)
    .where(eq(posts.blogSlug, slug))
    .orderBy(desc(posts.createdAt));

  // Get all unique writer IDs
  const writerIds = blogs.reduce((ids, blog) => {
    if (
      blog.writers &&
      Array.isArray(blog.writers) &&
      blog.writers.length > 0
    ) {
      return [...new Set([...ids, ...blog.writers])];
    }
    return ids;
  }, [] as string[]);

  // Fetch writers if there are any IDs
  const writersData =
    writerIds.length > 0
      ? await db.select().from(writers).where(inArray(writers.id, writerIds))
      : [];

  // Return both posts and writers separately
  return {
    posts: blogs,
    writers: writersData,
  };
};

export const getBlogPost = cache(async (slug: string, blogSlug: string) => {
  const post = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.blogSlug, blogSlug)))
    .limit(1);

  if (post.length === 0) {
    notFound();
  }

  return post[0];
});
