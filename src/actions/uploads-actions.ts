"use server";

import { db } from "@/db";
import { blogs } from "@/db/schema";
import getSession from "@/lib/getSession";
import { eq } from "drizzle-orm";

export const uploadFavicon = async (url: string, blogSlug: string) => {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) throw new Error("Unauthorized");

  console.log("Uploading...");

  try {
    await db
      .update(blogs)
      .set({ favicon: url })
      .where(eq(blogs.slug, blogSlug));

    console.log("Uploaded successfully!");

    return { success: true, message: "Favicon uploaded successfully!" };
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
    return { success: true, message: "Favicon uploaded successfully!" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to upload OpenGraph image!" };
  }
};
