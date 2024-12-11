"use server";

import { slugifyPost } from "@/lib/slugify";
import { BlogPostSchema } from "../../schema";
import { blogs, posts } from "@/db/schema";
import { db } from "@/db";
import { and, desc, eq } from "drizzle-orm";
import getSession from "@/lib/getSession";

export const getBlogPosts = async (blogSlug: string) => {
  const session = await getSession();
  if (!session || !session.user?.id) {
    return { success: false, error: "Unauthorized!" };
  }
  const userId = session.user?.id;

  try {
    const [blog] = await db
      .select()
      .from(blogs)
      .where(and(eq(blogs.slug, blogSlug), eq(blogs.userId, userId)))
      .execute();

    if (!blog) {
      return {
        success: false,
        error: "Blog not found or you do not have permission to access it.",
      };
    }

    const blogPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        description: posts.description,
        content: posts.content,
        isNewsletter: posts.isNewsletter,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .where(eq(posts.blogSlug, blogSlug))
      .orderBy(desc(posts.createdAt))
      .execute();

    return {
      success: true,
      posts: blogPosts,
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      success: false,
      error: "Failed to retrieve blog posts.",
      details: error instanceof Error ? error.message : String(error),
    };
  }
};

export const createPost = async (formData: FormData) => {
  const validatedFields = BlogPostSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
    blogSlug: formData.get("blogSlug"),
    isNewsletter: formData.get("isNewsletter") === "true",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { title, description, content, isNewsletter, blogSlug } =
    validatedFields.data;

  try {
    const [existingBlog] = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, blogSlug))
      .execute();

    if (!existingBlog) {
      return {
        success: false,
        message: `Blog with slug "${blogSlug}" does not exist.`,
      };
    }

    const slug = await slugifyPost(title);

    const postData = {
      title,
      slug,
      description,
      content,
      isNewsletter: isNewsletter ?? false,
      blogSlug: existingBlog.slug,
    };

    const [newPost] = await db.insert(posts).values(postData).returning();

    return {
      success: true,
      post: newPost,
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      success: false,
      message: "Database Error: Failed to create post.",
      errorDetails: error instanceof Error ? error.message : String(error),
    };
  }
};
