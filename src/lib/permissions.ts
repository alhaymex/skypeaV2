import { BlogPost } from "@/app/[blogSlug]/p/[slug]/BlogPage";
import { Subscription } from "./subscribtion";

export const canCreateBlog = (
  subscription: Subscription,
  currentBlogsCount: number
) => {
  const maxBlogsMap: Record<Subscription, number> = {
    free: 1,
    pro: 10,
  };

  const maxBlogs = maxBlogsMap[subscription];

  return currentBlogsCount < maxBlogs;
};

export const canCreateBlogPage = (
  subscription: Subscription,
  currentPagesCount: number
) => {
  const maxPagesMap: Record<Subscription, number> = {
    free: 3,
    pro: 10,
  };

  const maxPages = maxPagesMap[subscription];

  return currentPagesCount < maxPages;
};

export const canCreateBlogPost = (
  subscription: Subscription,
  posts: BlogPost[]
): boolean => {
  const maxMonthlyPostsMap: Record<Subscription, number> = {
    free: 5,
    pro: 30,
  };

  const currentDate = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(currentDate.getDate() - 30);

  const recentPosts = posts.filter((post) => {
    const postDate = new Date(post.createdAt);
    return postDate >= thirtyDaysAgo && postDate <= currentDate;
  });

  return recentPosts.length < maxMonthlyPostsMap[subscription];
};

export const canCreateEmail = (
  subscription: Subscription,
  currentEmailsCount: number
) => {
  const maxEmailsMap: Record<Subscription, number> = {
    free: 1000,
    pro: 50000,
  };

  const maxEmails = maxEmailsMap[subscription];

  return currentEmailsCount < maxEmails;
};

export const canConnectDomain = (subscription: Subscription) => {
  return subscription === "pro";
};

export const canAccessAnalytics = (subscription: Subscription) => {
  return subscription === "pro";
};
