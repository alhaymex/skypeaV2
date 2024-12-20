import { getBlogPost } from "@/actions/display-actions";
import BlogPage, { BlogPost } from "./BlogPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; blogSlug: string }>;
}) {
  const { slug, blogSlug } = await params;
  const blogPost = await getBlogPost(slug, blogSlug);
  console.log("first", blogPost);

  return (
    <BlogPage params={{ slug, blogSlug }} blogPost={blogPost as BlogPost} />
  );
}
