import { getBlog } from "@/actions/blogs-actions";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {
  const blogSlug = (await params).blogSlug;
  console.log("Rendering blog page for slug:", blogSlug);

  const blogResult = await getBlog(blogSlug);

  if (!blogResult.success) {
    console.log("Blog not found for slug:", blogSlug);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
        <p className="text-gray-600 mb-8">
          {`The blog you're looking for doesn't exist.`}
        </p>
        <p className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Return Home
        </p>
      </div>
    );
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
