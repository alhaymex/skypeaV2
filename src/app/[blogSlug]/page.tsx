import { getBlogBySlug } from "@/actions/blogs-actions";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {
  const blogSlug = (await params).blogSlug;
  console.log("Accessed blogSlug:", blogSlug); // Add this line for debugging

  const blogResult = await getBlogBySlug(blogSlug);

  if (!blogResult.success) {
    console.log("Blog not found for slug:", blogSlug); // Add this line for debugging
    return <div>Blog not found</div>;
  }

  const blog = blogResult.data;
  console.log("Rendering blog:", blog!.name); // Add this line for debugging

  return (
    <div>
      <h1>{blog!.name}</h1>
      <p>{blog!.description}</p>
      {/* Add more blog content here */}
    </div>
  );
}
