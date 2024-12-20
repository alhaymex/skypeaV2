import slugify from "slugify";
import { db } from "@/db";
import { blogs, posts } from "@/db/schema";
import { eq } from "drizzle-orm";

function createSlug(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function slugifyBlogTitle(name: string) {
  const slug = createSlug(name);
  let counter = 0;
  let uniqueSlug = slug;

  while (true) {
    // Check if the slug exists in the database
    const existingBlog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, uniqueSlug))
      .limit(1);

    if (!existingBlog.length) {
      return uniqueSlug;
    }

    counter++;
    uniqueSlug = `${slug}-${counter}`;
  }
}

export async function slugifyPost(name: string) {
  const slug = slugify(name, {
    lower: true,
    strict: true,
    locale: "ar",
    trim: true,
    replacement: "-",
  });

  let counter = 0;
  let uniqueSlug = slug;

  while (true) {
    const existingPost = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, uniqueSlug))
      .limit(1);

    if (!existingPost.length) {
      return uniqueSlug;
    }

    counter++;
    uniqueSlug = `${slug}-${counter}`;
  }
}
