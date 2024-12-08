import { getBlogForDisplay } from "@/actions/display-actions";
import { notFound, redirect } from "next/navigation";

export default async function BlogIndexPage({
  params,
}: {
  params: { blogSlug: string };
}) {
  const { blogSlug } = params;
  console.log("Rendering blog index for slug:", blogSlug);

  const blogResult = await getBlogForDisplay(blogSlug);

  if (!blogResult.success) {
    console.error("Blog not found for slug:", blogSlug);
    notFound();
  }

  const blog = blogResult.data;
  const homePage = blog!.pages.find((page) => page.slug === "home");

  if (!homePage) {
    console.error("Home page not found for blog:", blogSlug);
    notFound();
  }

  redirect(`/${blogSlug}/${homePage.slug}`);
}
