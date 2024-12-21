"use server";

import { slugifyPost } from "@/lib/slugify";
import {
  AddWriterInput,
  AddWriterSchema,
  BlogPostSchema,
  GetWritersInput,
  GetWritersSchema,
} from "../../schema";
import { blogs, posts, writers } from "@/db/schema";
import { db } from "@/db";
import { and, desc, eq } from "drizzle-orm";
import getSession from "@/lib/getSession";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
  const session = await getSession();
  if (!session || !session.user?.id) {
    return { success: false, error: "Unauthorized!" };
  }
  const userId = session.user?.id;

  const writersData = formData.get("writers");
  const writers = writersData
    ? Array.isArray(writersData)
      ? writersData
      : typeof writersData === "string"
      ? writersData.split(",")
      : [userId]
    : [userId];

  const validatedFields = BlogPostSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
    image: formData.get("image"),
    blogSlug: formData.get("blogSlug"),
    isNewsletter: formData.get("isNewsletter") === "true",
    writers: writers,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const {
    title,
    description,
    content,
    image,
    isNewsletter,
    blogSlug,
    writers: writersList,
  } = validatedFields.data;

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
      image,
      isNewsletter: isNewsletter ?? false,
      blogSlug: existingBlog.slug,
      writers: writersList,
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

export async function deletePost(postId: string, blogSlug: string) {
  const session = await getSession();
  if (!session || !session.user?.id) {
    return { success: false, error: "Unauthorized!" };
  }
  const userId = session.user?.id;

  try {
    const [existingPost] = await db
      .select({
        id: posts.id,
        blogSlug: posts.blogSlug,
      })
      .from(posts)
      .where(and(eq(posts.id, postId), eq(posts.blogSlug, blogSlug)))
      .execute();

    const [blog] = await db
      .select()
      .from(blogs)
      .where(and(eq(blogs.slug, blogSlug), eq(blogs.userId, userId)))
      .execute();

    if (!existingPost || !blog) {
      return {
        success: false,
        error: "Post not found or you do not have permission to delete it.",
      };
    }

    const [deletedPost] = await db
      .delete(posts)
      .where(eq(posts.id, postId))
      .returning({
        id: posts.id,
        title: posts.title,
      });

    return {
      success: true,
      message: `Post "${deletedPost.title}" has been deleted.`,
      postId: deletedPost.id,
    };
  } catch (error) {
    console.error("Error deleting post:", error);
    return {
      success: false,
      error: "Failed to delete post.",
      details: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function addWriter(input: AddWriterInput) {
  try {
    // Validate input
    const validatedInput = AddWriterSchema.parse(input);

    // Check if writer already exists for this blog
    const [existingWriter] = await db
      .select({
        name: writers.name,
      })
      .from(writers)
      .where(eq(writers.blogSlug, validatedInput.blogSlug))
      .limit(1);

    if (existingWriter?.name === validatedInput.name) {
      return {
        error: "A writer with this name already exists for this blog",
      };
    }

    const [newWriter] = await db
      .insert(writers)
      .values({
        blogSlug: validatedInput.blogSlug,
        name: validatedInput.name,
        avatar: validatedInput.avatar,
      })
      .returning();

    revalidatePath(`/projects/${validatedInput.blogSlug}/writers`);

    return {
      data: newWriter,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.errors[0].message,
      };
    }

    return {
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function getWriters(input: GetWritersInput) {
  try {
    // Validate input
    const validatedInput = GetWritersSchema.parse(input);

    // Fetch writers for the blog
    const blogWriters = await db
      .select({
        id: writers.id,
        name: writers.name,
        avatar: writers.avatar,
        blogSlug: writers.blogSlug,
        createdAt: writers.createdAt,
        updatedAt: writers.updatedAt,
      })
      .from(writers)
      .where(eq(writers.blogSlug, validatedInput.blogSlug))
      .orderBy(writers.createdAt);

    // Transform the data to match the Writer interface
    const transformedWriters = blogWriters.map((writer) => ({
      id: writer.id,
      fullName: writer.name,
      avatar: writer.avatar || "",
      blogSlug: writer.blogSlug,
      createdAt: writer.createdAt,
      updatedAt: writer.updatedAt,
    }));

    return {
      data: transformedWriters,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.errors[0].message,
      };
    }

    return {
      error: "Failed to fetch writers. Please try again.",
    };
  }
}
