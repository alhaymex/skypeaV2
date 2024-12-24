"use server";

import { db } from "@/db";
import { messages } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
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
    // Debug log the input
    console.log("Getting messages for blogSlug:", blogSlug);

    // Get all messages first to debug
    const allMessages = await db.select().from(messages);
    console.log(
      "All messages in database:",
      JSON.stringify(allMessages, null, 2)
    );

    // Get messages for specific blogSlug
    const m = await db
      .select()
      .from(messages)
      .where(eq(messages.blogSlug, blogSlug))
      .orderBy(desc(messages.createdAt));

    console.log("Found messages for blogSlug:", JSON.stringify(m, null, 2));

    return {
      data: m,
      success: true,
    };
  } catch (error) {
    console.error("Error getting messages:", error);
    return { success: false, error: "Failed to get messages" };
  }
};
