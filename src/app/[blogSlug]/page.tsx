import { getBlogForDisplay } from "@/actions/blogs-actions";
import { notFound } from "next/navigation";
import { ComponentData } from "@/types/types";
import { Grid } from "@/components/templates/Grid";
import { Footer } from "@/components/templates/Footer";
import { Hero } from "@/components/templates/Hero";
import { Navbar } from "@/components/templates/Navbar";
import { Form } from "@/components/templates/Form";

interface Page {
  id: string;
  name: string;
  slug: string;
  components: ComponentData[];
}

interface BlogData {
  id: string;
  name: string;
  slug: string;
  pages: Page[];
}

function renderComponent(component: ComponentData) {
  switch (component.type) {
    case "navbar":
      return <Navbar key={component.id} {...component.data} />;
    case "hero":
      return <Hero key={component.id} {...component.data} />;
    case "form":
      return <Form key={component.id} {...component.data} />;
    case "grid":
      return <Grid key={component.id} {...component.data} />;
    case "footer":
      return <Footer key={component.id} {...component.data} />;

    default:
      return (
        <div key={component.id}>
          <h3>{component.type} Component</h3>
          <pre>{JSON.stringify(component.data, null, 2)}</pre>
        </div>
      );
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {
  const blogSlug = (await params).blogSlug;
  console.log("Rendering blog page for slug:", blogSlug);

  const blogResult = await getBlogForDisplay(blogSlug);

  if (!blogResult.success) {
    console.log("Blog not found for slug:", blogSlug);
    notFound();
  }

  const blog = blogResult.data as BlogData;

  return (
    <div className="min-h-screen">
      {blog.pages.map((page) => (
        <section key={page.id} id={page.slug}>
          {page.components.map((component) => renderComponent(component))}
        </section>
      ))}
    </div>
  );
}
