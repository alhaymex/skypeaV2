"use server";

import { db } from "@/db";
import { blogSchema } from "../../schema";
import { blogs } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import getSession from "@/lib/getSession";
import { slugify } from "@/lib/slugify";

export async function createBlog(data: z.infer<typeof blogSchema>) {
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
}
