import { getBlog } from "@/actions/blogs-actions";
import NotFound from "../not-found";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {
  const blogSlug = (await params).blogSlug;
  console.log("Rendering blog page for slug:", blogSlug);

  const blogResult = await getBlog(blogSlug);

  if (!blogResult.success) {
    return <NotFound />;
  }

  const blog = blogResult.data;

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold">{blog!.name}</h1>
      <p className="mt-4 text-gray-600">{blog!.description}</p>
      {/* Add your blog content here */}
    </div>
  );
}
