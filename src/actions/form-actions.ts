"use server";

import { db } from "@/db";
import { messages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const submitFormMessage = async (
  blogSlug: string,
  formData: Record<string, { value: string | boolean; label: string }>
) => {
  console.log(blogSlug, formData);
  try {
    const [newMessage] = await db
      .insert(messages)
      .values({
        blogSlug,
        formData: formData,
      })
      .returning();
    revalidatePath(`/${blogSlug}`);
    return { success: true, messageId: newMessage.id };
  } catch (error) {
    console.error("Error submitting message:", error);
    return { success: false, error: "Failed to submit message" };
  }
};

export const getMessages = async (blogSlug: string) => {
  try {
    const getMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.blogSlug, blogSlug));
    return { data: getMessages, success: true };
  } catch (error) {
    console.error("Error getting messages:", error);
    return { success: false, error: "Failed to get messages" };
  }
};
