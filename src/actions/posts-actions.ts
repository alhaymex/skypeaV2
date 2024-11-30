"use server";

import { BlogPostSchema } from "../../schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const validatedFields = BlogPostSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
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
    };
  }

  const {
    title,
    slug,
    description,
    content,
    publishOption,
    scheduledTime,
    isDistributed,
    blogSlug,
  } = validatedFields.data;

  const post = {
    title,
    slug,
    description,
    content,
    publishOption,
    scheduledTime: scheduledTime ? new Date(scheduledTime) : null,
    isDistributed,
    blogSlug,
    status: publishOption === "published" ? "published" : "draft",
  };

  try {
    console.log("Post created successfully: from acton", post);
    // Here you would typically save the post to your database
    // For now, we're just logging it

    // Uncomment these lines when you're ready to implement redirection
    // revalidatePath("/posts");
    // redirect("/posts");

    return { success: true, post };
  } catch (error) {
    console.error("Error:", error);
    return {
      message: "Error: Failed to create post.",
    };
  }
}
