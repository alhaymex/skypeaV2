"use server";

import { slugifyPost } from "@/lib/slugify";
import { BlogPostSchema } from "../../schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { blogs, posts } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function createPost(formData: FormData) {
  // Validate the form data using Zod schema
  const validatedFields = BlogPostSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
    publishOption: formData.get("publishOption"),
    scheduledTime: formData.get("scheduledTime"),
    isDistributed: formData.get("isDistributed") === "on",
    blogSlug: formData.get("blogSlug"),
  });

  // If validation fails, return field errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  // Generate a unique slug for the post
  const slug = await slugifyPost(validatedFields.data.title);

  // Destructure validated data
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
    // Check if the blog exists
    const existingBlogs = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, blogSlug))
      .limit(1);

    // If no blog found, return an error
    if (existingBlogs.length === 0) {
      return {
        success: false,
        message: `Blog with slug "${blogSlug}" does not exist.`,
      };
    }

    // Prepare post data with explicit typing
    const postData = {
      title,
      slug,
      description,
      content,
      publishOption,
      scheduledTime: scheduledTime ? new Date(scheduledTime) : null,
      isDistributed,
      blogSlug: existingBlogs[0].slug, // Use the blog's ID, not slug
      status:
        publishOption === "published"
          ? "published"
          : publishOption === "draft"
          ? "draft"
          : ("draft" as "draft" | "published" | "archived"),
      metadata: undefined,
    };

    // Insert the new post
    const newPost = await db.insert(posts).values(postData).returning();

    // Return the created post
    return {
      success: true,
      post: newPost[0],
    };
  } catch (error) {
    // Log the detailed error for server-side debugging
    console.error("Database Error:", error);

    // Return a generic error message
    return {
      success: false,
      message: "Database Error: Failed to create post.",
      // Optionally, you can include the error details for more context
      errorDetails: error instanceof Error ? error.message : String(error),
    };
  }
}
