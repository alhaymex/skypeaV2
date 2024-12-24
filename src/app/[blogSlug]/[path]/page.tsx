import { notFound } from "next/navigation";
import { ComponentData } from "@/types/types";
import { Grid } from "@/components/templates/Grid";
import { Footer } from "@/components/templates/Footer";
import { Hero } from "@/components/templates/Hero";
import { Navbar } from "@/components/templates/Navbar";
import { Form } from "@/components/templates/Form";
import { getBlogForDisplay } from "@/actions/display-actions";
import { Carousel } from "@/components/templates/Carousel";
import DynamicBlogs from "@/components/templates/DynamicBlogs";
import { DisplayForm } from "@/components/templates/DisplayForm";

interface Page {
  id: string;
  name: string;
  slug: string;
  order: number;
  components: ComponentData[];
}

interface BlogData {
  id: string;
  name: string;
  slug: string;
  backgroundColor: string;
  fontFamily: string;
  pages: Page[];
}

function renderComponent(component: ComponentData, slug: string) {
  switch (component.type) {
    case "navbar":
      return <Navbar key={component.id} {...component.data} />;
    case "hero":
      return <Hero key={component.id} {...component.data} />;
    case "form":
      return <DisplayForm key={component.id} {...component.data} slug={slug} />;
    case "grid":
      if (component.data.isDynamic) {
        return <DynamicBlogs slug={slug as string} />;
      }
      return <Grid key={component.id} {...component.data} />;
    case "footer":
      return <Footer key={component.id} {...component.data} />;
    case "carousel":
      return <Carousel key={component.id} carouselState={component.data} />;
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
  params: Promise<{ blogSlug: string; path: string }>;
}) {
  const { blogSlug, path } = await params;
  console.log("Rendering blog page for slug:", blogSlug, "Page:", path);

  const blogResult = await getBlogForDisplay(blogSlug);

  if (!blogResult.success) {
    console.error("Blog not found for slug:", blogSlug);
    notFound();
  }

  const blog = blogResult.data as BlogData;
  const currentPage = blog.pages.find((page) => page.slug === path);

  if (!currentPage) {
    console.error("Page not found for slug:", path);
    notFound();
  }

  // Apply background color and font family to the entire body
  const bodyStyle = `
    body {
      background-color: ${blog.backgroundColor};
      font-family: ${blog.fontFamily}, sans-serif;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: bodyStyle }} />
      <div className="min-h-screen">
        <main>
          {currentPage.components.map((component) =>
            renderComponent(component, blogSlug)
          )}
        </main>
      </div>
    </>
  );
}
