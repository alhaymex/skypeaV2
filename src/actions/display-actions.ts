import { db } from "@/db";
import { blogComponents, blogPages, blogs, posts } from "@/db/schema";
import { BlogPageWithComponents } from "@/types/types";
import { asc, desc, eq } from "drizzle-orm";

export const getBlogForDisplay = async (slug: string) => {
  try {
    const rawBlogData = await db
      .select({
        blogId: blogs.id,
        blogName: blogs.name,
        blogSlug: blogs.slug,
        pageId: blogPages.id,
        pageName: blogPages.name,
        pageSlug: blogPages.slug,
        pageOrder: blogPages.order,
        componentId: blogComponents.id,
        componentType: blogComponents.type,
        componentOrder: blogComponents.order,
        componentData: blogComponents.data,
        backgroundColor: blogs.backgroundColor,
        fontFamily: blogs.fontFamily,
      })
      .from(blogs)
      .leftJoin(blogPages, eq(blogs.id, blogPages.blogId))
      .leftJoin(blogComponents, eq(blogPages.id, blogComponents.pageId))
      .where(eq(blogs.slug, slug))
      .orderBy(asc(blogPages.order), asc(blogComponents.order));

    if (rawBlogData.length === 0) {
      return { success: false, message: "Blog not found" };
    }

    const pagesMap = new Map<string, BlogPageWithComponents>();

    rawBlogData.forEach((row) => {
      if (row.pageId && !pagesMap.has(row.pageId)) {
        pagesMap.set(row.pageId, {
          id: row.pageId!,
          name: row.pageName!,
          slug: row.pageSlug!,
          order: row.pageOrder!,
          components: [],
        });
      }

      if (row.componentId) {
        const page = pagesMap.get(row.pageId!);
        if (page) {
          page.components.push({
            id: row.componentId!,
            type: row.componentType!,
            order: row.componentOrder!,
            data: row.componentData!,
          });
        }
      }
    });

    return {
      success: true,
      data: {
        id: rawBlogData[0].blogId!,
        name: rawBlogData[0].blogName!,
        slug: rawBlogData[0].blogSlug!,
        backgroundColor: rawBlogData[0].backgroundColor!,
        fontFamily: rawBlogData[0].fontFamily!,
        pages: Array.from(pagesMap.values()),
      },
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { success: false, message: "Failed to fetch blog" };
  }
};

export const getBlogPostsForDisplay = async (slug: string) => {
  const blogs = await db
    .select()
    .from(posts)
    .where(eq(posts.blogSlug, slug))
    .orderBy(desc(posts.createdAt));

  console.log(blogs);

  return blogs;
};
