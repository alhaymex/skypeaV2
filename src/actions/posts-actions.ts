"use server";

import { slugifyPost } from "@/lib/slugify";
import { BlogPostSchema } from "../../schema";
import { blogs, posts } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function createPost(formData: FormData) {
  const validatedFields = BlogPostSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
    publishOption: formData.get("publishOption"),
    scheduledTime: formData.get("scheduledTime"),
    isDistributed: formData.get("isDistributed") === "on",
    blogSlug: formData.get("blogSlug"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const slug = await slugifyPost(validatedFields.data.title);

  const {
    title,
    description,
    content,
    publishOption,
    scheduledTime,
    isDistributed,
    blogSlug,
  } = validatedFields.data;

  try {
    const existingBlogs = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, blogSlug))
      .limit(1);

    if (existingBlogs.length === 0) {
      return {
        success: false,
        message: `Blog with slug "${blogSlug}" does not exist.`,
      };
    }

    const postData = {
      title,
      slug,
      description,
      content,
      publishOption,
      scheduledTime: scheduledTime ? new Date(scheduledTime) : null,
      isDistributed,
      blogSlug: existingBlogs[0].slug,
      status:
        publishOption === "published"
          ? "published"
          : publishOption === "draft"
          ? "draft"
          : ("draft" as "draft" | "published" | "archived"),
      metadata: undefined,
    };

    const newPost = await db.insert(posts).values(postData).returning();

    return {
      success: true,
      post: newPost[0],
    };
  } catch (error) {
    console.error("Database Error:", error);

    return {
      success: false,
      message: "Database Error: Failed to create post.",
      errorDetails: error instanceof Error ? error.message : String(error),
    };
  }
}
