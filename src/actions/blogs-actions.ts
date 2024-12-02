"use server";

import { db } from "@/db";
import { blogSchema } from "../../schema";
import { blogAnalytics, blogComponents, blogPages, blogs } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import getSession from "@/lib/getSession";
import { slugify } from "@/lib/slugify";
import { and, asc, desc, eq, gt, sql } from "drizzle-orm";
import { BlogPageWithComponents, ComponentData } from "@/types/types";
import { createSubdomain } from "@/lib/vercel";
import { pages } from "next/dist/build/templates/app-page";

export const getBlogs = async () => {
  const session = await getSession();
  if (!session || !session.user || !session.user.id) return [];

  return await db.select().from(blogs).where(eq(blogs.userId, session.user.id));
};

export const createBlog = async (data: z.infer<typeof blogSchema>) => {
  try {
    const session = await getSession();

    if (!session || !session.user || !session.user.id)
      return { success: false, message: "User not authenticated" };

    const userId = session.user.id;
    const slug = await slugify(data.name);

    // // Create the subdomain
    // let subdomain;
    // try {
    //   subdomain = await createSubdomain(slug);
    // } catch (subdomainError) {
    //   console.error("Error creating subdomain:", subdomainError);
    //   return { success: false, message: "Failed to create subdomain" };
    // }

    const blog = { ...data, slug, userId };

    const insertedBlogs = await db.insert(blogs).values(blog).returning();

    if (insertedBlogs.length > 0) {
      await db.insert(blogAnalytics).values({
        blogSlug: insertedBlogs[0].slug,
        totalSubscribers: 0,
        publishedPosts: 0,
        totalViews: 0,
        newslettersSent: 0,
      });
    }

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
};

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
        pages: Array.from(pagesMap.values()),
      },
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { success: false, message: "Failed to fetch blog" };
  }
};

export const getBlogBySlug = async (slug: string) => {
  const session = await getSession();

  if (!session || !session.user || !session.user.id) {
    return { success: false, message: "User not authenticated" };
  }

  const blog = await db
    .select()
    .from(blogs)
    .where(and(eq(blogs.slug, slug), eq(blogs.userId, session.user.id)));

  return { success: true, data: blog[0] };
};

export const getBlog = async (slug: string) => {
  try {
    const blog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .limit(1)
      .then((rows) => rows[0]);

    if (!blog) {
      console.log("Blog not found for slug:", slug); // Add this line for debugging
      return { success: false, message: "Blog not found" };
    }

    console.log("Found blog:", blog); // Add this line for debugging
    return { success: true, data: blog };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { success: false, message: "Error fetching blog" };
  }
};

export const addBlogPage = async (
  blogSlug: string,
  pageName: string,
  pageSlug: string
) => {
  try {
    const blog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, blogSlug))
      .limit(1)
      .then((rows) => rows[0]);

    if (!blog) {
      throw new Error("Blog not found");
    }

    const lastPage = await db
      .select()
      .from(blogPages)
      .where(eq(blogPages.blogId, blog.id))
      .orderBy(asc(blogPages.order))
      .limit(1)
      .then((rows) => rows[0]);

    const newOrder = lastPage ? lastPage.order + 1 : 1;

    const [newPage] = await db
      .insert(blogPages)
      .values({
        blogId: blog.id,
        name: pageName,
        slug: pageSlug,
        order: newOrder,
      })
      .returning();

    return { success: true, page: newPage };
  } catch (error) {
    console.error("Error adding blog page:", error);
    return { success: false, error: "Failed to add blog page" };
  }
};

export const deleteBlogPage = async (blogSlug: string, pageId: string) => {
  try {
    const blog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, blogSlug))
      .limit(1)
      .then((rows) => rows[0]);

    if (!blog) {
      throw new Error("Blog not found");
    }

    const pageToDelete = await db
      .select()
      .from(blogPages)
      .where(and(eq(blogPages.id, pageId), eq(blogPages.blogId, blog.id)))
      .limit(1)
      .then((rows) => rows[0]);

    if (!pageToDelete) {
      throw new Error("Page not found");
    }

    // Delete all components associated with the page
    await db.delete(blogComponents).where(eq(blogComponents.pageId, pageId));

    // Delete the page
    await db.delete(blogPages).where(eq(blogPages.id, pageId));

    // Update the order of remaining pages
    await db
      .update(blogPages)
      .set({
        order: sql`${blogPages.order} - 1`,
      })
      .where(
        and(
          eq(blogPages.blogId, blog.id),
          gt(blogPages.order, pageToDelete.order)
        )
      );

    return { success: true };
  } catch (error) {
    console.error("Error deleting blog page:", error);
    return { success: false, error: "Failed to delete blog page" };
  }
};

export const saveComponent = async (
  slug: string,
  component: ComponentData,
  pageId: string
) => {
  try {
    // Fetch the blog
    const blog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .limit(1)
      .then((rows) => rows[0]);

    if (!blog) {
      return { success: false, message: "Blog not found" };
    }

    // Fetch the page
    const page = await db
      .select()
      .from(blogPages)
      .where(eq(blogPages.id, pageId))
      .limit(1)
      .then((rows) => rows[0]);

    if (!page) {
      return { success: false, message: "Page not found" };
    }

    // Get the last component's order for the page
    const lastComponent = await db
      .select()
      .from(blogComponents)
      .where(eq(blogComponents.pageId, pageId))
      .orderBy(desc(blogComponents.order))
      .limit(1)
      .then((rows) => rows[0]);

    const newOrder = lastComponent ? lastComponent.order + 1 : 1;

    // Insert the new component
    const [newComponent] = await db
      .insert(blogComponents)
      .values({
        pageId: pageId,
        type: component.type,
        order: newOrder,
        data: component.data,
      })
      .returning({ id: blogComponents.id });

    return { success: true, dbId: newComponent.id };
  } catch (error) {
    console.error("Error saving component:", error);
    return { success: false, message: "Failed to save component" };
  }
};

export const deleteComponent = async (slug: string, componentId: string) => {
  try {
    // Fetch the blog
    const blog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .limit(1)
      .then((rows) => rows[0]);

    if (!blog) {
      throw new Error("Blog not found");
    }

    // Fetch the component to be deleted
    const componentToDelete = await db
      .select()
      .from(blogComponents)
      .where(eq(blogComponents.id, componentId))
      .limit(1)
      .then((rows) => rows[0]);

    if (!componentToDelete) {
      throw new Error("Component not found");
    }

    // Verify that the component belongs to a page in the correct blog
    const page = await db
      .select()
      .from(blogPages)
      .where(
        and(
          eq(blogPages.id, componentToDelete.pageId),
          eq(blogPages.blogId, blog.id)
        )
      )
      .limit(1)
      .then((rows) => rows[0]);

    if (!page) {
      throw new Error("Component does not belong to the specified blog");
    }

    // Delete the component
    await db.delete(blogComponents).where(eq(blogComponents.id, componentId));

    // Update the order of remaining components on the same page
    await db
      .update(blogComponents)
      .set({
        order: sql`${blogComponents.order} - 1`,
      })
      .where(
        and(
          eq(blogComponents.pageId, componentToDelete.pageId),
          gt(blogComponents.order, componentToDelete.order)
        )
      );

    return { success: true };
  } catch (error) {
    console.error("Error deleting component:", error);
    return { success: false, error: "Failed to delete component" };
  }
};

export const getBlogComponents = async (slug: string) => {
  try {
    // Fetch the blog
    const blog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .limit(1)
      .then((rows) => rows[0]);

    if (!blog) {
      throw new Error("Blog not found");
    }

    // Fetch all pages for the blog
    const pages = await db
      .select()
      .from(blogPages)
      .where(eq(blogPages.blogId, blog.id))
      .orderBy(asc(blogPages.order));

    // Fetch components for each page
    const pagesWithComponents = await Promise.all(
      pages.map(async (page) => {
        const components = await db
          .select()
          .from(blogComponents)
          .where(eq(blogComponents.pageId, page.id))
          .orderBy(asc(blogComponents.order));

        return {
          id: page.id,
          name: page.name,
          slug: page.slug,
          order: page.order,
          components: components.map((component) => ({
            type: component.type,
            id: `${component.type}-${component.id}`,
            dbId: component.id,
            data: component.data,
          })),
        };
      })
    );

    return pagesWithComponents;
  } catch (error) {
    console.error("Error fetching blog pages and components:", error);
    throw new Error("Failed to fetch blog pages and components");
  }
};

export const updateBlogSettings = async (
  slug: string,
  backgroundColor: string,
  fontFamily: string
): Promise<void> => {
  try {
    await db
      .update(blogs)
      .set({
        backgroundColor,
        fontFamily,
        updatedAt: new Date(),
      })
      .where(eq(blogs.slug, slug));
  } catch (error) {
    console.error("Error updating blog settings:", error);
    throw new Error("Failed to update blog settings");
  }
};

export const getBlogSettings = async (
  slug: string
): Promise<{ backgroundColor: string; fontFamily: string }> => {
  try {
    const blog = await db
      .select({
        backgroundColor: blogs.backgroundColor,
        fontFamily: blogs.fontFamily,
      })
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .limit(1)
      .then((rows) => rows[0]);

    if (!blog) {
      throw new Error(`Blog with slug ${slug} not found`);
    }

    return {
      backgroundColor: blog.backgroundColor,
      fontFamily: blog.fontFamily,
    };
  } catch (error) {
    console.error("Error fetching blog settings:", error);
    throw new Error("Failed to fetch blog settings");
  }
};

export const getBlogAnalytics = async (slug: string) => {
  try {
    const analytics = await db
      .select()
      .from(blogAnalytics)
      .where(eq(blogAnalytics.blogSlug, slug))
      .limit(1)
      .then((rows) => rows[0]);

    if (!analytics) {
      throw new Error("Blog analytics not found");
    }

    return {
      ...analytics,
      dailyViewsHistory: analytics.dailyViewsHistory
        ? JSON.parse(analytics.dailyViewsHistory)
        : [],
      subscriberGrowthHistory: analytics.subscriberGrowthHistory
        ? JSON.parse(analytics.subscriberGrowthHistory)
        : [],
    };
  } catch (error) {
    console.error("Error fetching blog analytics:", error);
    throw new Error("Failed to fetch blog analytics");
  }
};
