"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ComponentData,
  NavLink,
  GridItem,
  FormField,
  FooterColumn,
} from "@/types/types";
import { Navbar } from "@/components/templates/Navbar";
import { Hero } from "@/components/templates/Hero";
import { Grid } from "@/components/templates/Grid";
import { Form } from "@/components/templates/Form";
import { Footer } from "@/components/templates/Footer";
import { Carousel } from "@/components/templates/Carousel";
import { MainContent } from "@/components/pages/projects/builder/MainContent";
import { Sidebar } from "@/components/pages/projects/builder/BuilderSidebar";
import {
  deleteComponent,
  getBlogComponents,
  getBlogSettings,
  saveComponent,
  updateBlogSettings,
  deleteBlogPage,
} from "@/actions/blogs-actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import {
  CarouselState,
  FooterState,
  FormState,
  GridState,
  HeroState,
  NavbarState,
  PageState,
} from "@/types/components";

interface Page {
  id: string;
  name: string;
  slug: string;
  components: ComponentData[];
}

export default function BlogBuilder() {
  const { slug } = useParams() as { slug: string };
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);

  const { toast } = useToast();

  const [navbarState, setNavbarState] = useState<NavbarState>({
    titleType: "text" as "text" | "image",
    title: "My Blog",
    logoUrl: "https://image.alhaymex.com/placeholder?height=32&width=32",
    links: [
      {
        id: "1",
        text: "Home",
        href: "/home",
        target: "_self",
        variant: "default",
      },
      {
        id: "2",
        text: "About",
        href: "/about",
        target: "_self",
        variant: "default",
      },
    ],
    layout: "default" as "default" | "centered" | "split",
    backgroundColor: "#ffffff",
    textColor: "#000000",
  });

  const [heroState, setHeroState] = useState<HeroState>({
    title: "Welcome to My Blog",
    subtitle: "Discover amazing content and insights",
    backgroundImage:
      "https://image.alhaymex.com/placeholder?height=1080&width=1920&shape=grid",
    ctaText: "Get Started",
    ctaLink: "#home",
  });

  const [gridState, setGridState] = useState<GridState>({
    items: [
      {
        id: "1",
        title: "Item 1",
        description: "Description for Item 1",
        imageUrl: "https://image.alhaymex.com/placeholder?height=200&width=200",
        author: "John Doe",
        date: "2023-05-01",
        tags: ["Tag 1", "Tag 2"],
        rating: 4,
        role: "Software Engineer",
      },
      {
        id: "2",
        title: "Item 2",
        description: "Description for Item 2",
        imageUrl: "https://image.alhaymex.com/placeholder?height=200&width=200",
        author: "Jane Smith",
        date: "2023-05-02",
        tags: ["Tag 2", "Tag 3"],
        rating: 5,
        role: "Product Manager",
      },
    ],
    columns: 3,
    template: "blog" as "blog" | "testimonial" | "feature",
    isDynamic: false,
  });

  const [formState, setFormState] = useState<FormState>({
    title: "Contact Us",
    description:
      "Fill out the form below to contact us. We'll get back to you as soon as possible.",
    fields: [
      {
        id: "1",
        label: "Name",
        type: "text" as const,
        placeholder: "Enter your name",
        required: false,
      },
      {
        id: "2",
        label: "Email",
        type: "email" as const,
        placeholder: "Enter your email",
        required: true,
      },
    ],
    submitButtonText: "Submit",
    textColor: "#000000",
    isNewsletter: false,
    buttonTextColor: "#000000",
    buttonBackgroundColor: "#ffffff",
    buttonBorderRadius: "4",
  });

  const [footerState, setFooterState] = useState<FooterState>({
    columns: [
      {
        title: "About Us",
        links: [
          { text: "Home", url: "#" },
          { text: "About", url: "#" },
        ],
      },
    ] as FooterColumn[],
    backgroundColor: "#f3f4f6",
    textColor: "#374151",
    showNewsletter: true,
    design: "simple" as "simple" | "multicolumn" | "newsletter",
    companyName: "Your Company Name",
  });

  const [pageState, setPageState] = useState<PageState>({
    backgroundColor: "#ffffff",
    fontFamily: "sans-serif",
  });

  const [carouselState, setCarouselState] = useState<CarouselState>({
    images: [],
    autoplay: false,
    interval: 5,
    showArrows: true,
    showDots: true,
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [pagesWithComponents, settings] = await Promise.all([
          getBlogComponents(slug),
          getBlogSettings(slug),
        ]);
        setPages(pagesWithComponents);
        setCurrentPageId(pagesWithComponents[0]?.id || null);
        setPageState(settings);
      } catch (error) {
        console.error("Failed to load data:", error);
        toast({
          title: "Error",
          description: "Failed to load blog data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [slug, toast]);

  const updatePageSettings = async (newSettings: {
    backgroundColor: string;
    fontFamily: string;
  }) => {
    try {
      setPageState(newSettings);
      await updateBlogSettings(
        slug,
        newSettings.backgroundColor,
        newSettings.fontFamily
      );
      // toast({
      //   title: "Success",
      //   description: "Blog settings updated successfully.",
      // });
    } catch (error) {
      setPageState(pageState);
      toast({
        title: "Error",
        description: "Failed to update blog settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addComponent = async (componentType: string, isDynamic = false) => {
    if (!currentPageId) {
      toast({
        title: "Error",
        description:
          "No page selected. Please select a page before adding a component.",
        variant: "destructive",
      });
      return;
    }

    let newComponent: ComponentData;
    switch (componentType) {
      case "navbar":
        newComponent = {
          type: "navbar",
          id: `navbar-${Date.now()}`,
          data: {
            title:
              navbarState.titleType === "text" ? navbarState.title : undefined,
            logoUrl:
              navbarState.titleType === "image"
                ? navbarState.logoUrl
                : undefined,
            links: navbarState.links,
            layout: navbarState.layout,
            backgroundColor: navbarState.backgroundColor,
            textColor: navbarState.textColor,
          },
        };
        break;
      case "hero":
        newComponent = {
          type: "hero",
          id: `hero-${Date.now()}`,
          data: heroState,
        };
        break;
      case "grid":
        if (isDynamic) {
          const defaultItems = [
            {
              id: "default-1",
              title: "Default Blog Post 1",
              description: "This is a placeholder for the first blog post.",
              imageUrl:
                "https://image.alhaymex.com/placeholder?shape=grid&height=200&width=200",
              author: "John Doe",
              date: new Date().toISOString().split("T")[0],
            },
            {
              id: "default-2",
              title: "Default Blog Post 2",
              description: "This is a placeholder for the second blog post.",
              imageUrl:
                "https://image.alhaymex.com/placeholder?shape=grid&height=200&width=200",
              author: "Jane Smith",
              date: new Date().toISOString().split("T")[0],
            },
            {
              id: "default-3",
              title: "Default Blog Post 3",
              description: "This is a placeholder for the third blog post.",
              imageUrl:
                "https://image.alhaymex.com/placeholder?shape=grid&height=200&width=200",
              author: "Alex Johnson",
              date: new Date().toISOString().split("T")[0],
            },
          ];
          newComponent = {
            type: "grid",
            id: `grid-${Date.now()}`,
            data: {
              ...gridState,
              items: defaultItems,
              template: "blog",
              columns: 3,
              isDynamic: true,
            },
          };
        } else {
          newComponent = {
            type: "grid",
            id: `grid-${Date.now()}`,
            data: gridState,
          };
        }
        break;
      case "form":
        newComponent = {
          type: "form",
          id: `form-${Date.now()}`,
          data: formState,
        };
        break;
      case "footer":
        newComponent = {
          type: "footer",
          id: `footer-${Date.now()}`,
          data: footerState,
        };
        break;
      case "carousel":
        newComponent = {
          type: "carousel",
          id: `carousel-${Date.now()}`,
          data: carouselState,
        };
        break;
      default:
        return;
    }

    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === currentPageId
          ? { ...page, components: [...page.components, newComponent] }
          : page
      )
    );

    try {
      const result = await saveComponent(slug, newComponent, currentPageId);

      if (!result.success) {
        throw new Error(result.message || "Failed to save component");
      }

      setPages((prevPages) =>
        prevPages.map((page) =>
          page.id === currentPageId
            ? {
                ...page,
                components: page.components.map((component) =>
                  component.id === newComponent.id
                    ? { ...component, dbId: result.dbId }
                    : component
                ),
              }
            : page
        )
      );

      // toast({
      //   title: "Component added",
      //   description: `${componentType} component has been added successfully.`,
      // });
    } catch (error) {
      console.error("Failed to save component:", error);
      setPages((prevPages) =>
        prevPages.map((page) =>
          page.id === currentPageId
            ? {
                ...page,
                components: page.components.filter(
                  (component) => component.id !== newComponent.id
                ),
              }
            : page
        )
      );
      toast({
        title: "Error",
        description: "Failed to add component. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeComponent = async (pageId: string, componentId: string) => {
    const pageToUpdate = pages.find((page) => page.id === pageId);
    if (!pageToUpdate) {
      console.error("Page not found");
      toast({
        title: "Error",
        description: "Page not found. Please refresh and try again.",
        variant: "destructive",
      });
      return;
    }

    const componentToRemove = pageToUpdate.components.find(
      (c) => c.id === componentId
    );
    if (!componentToRemove) {
      console.error("Component not found");
      toast({
        title: "Error",
        description: "Component not found. Please refresh and try again.",
        variant: "destructive",
      });
      return;
    }

    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              components: page.components.filter(
                (component) => component.id !== componentId
              ),
            }
          : page
      )
    );

    try {
      if (componentToRemove.dbId) {
        const result = await deleteComponent(slug, componentToRemove.dbId);

        if (!result.success) {
          throw new Error(result.error || "Failed to delete component");
        }
      } else {
        console.log("Removing unsaved component");
      }

      // toast({
      //   title: "Component removed",
      //   description: "The component has been removed successfully.",
      // });
    } catch (error) {
      console.error("Failed to delete component:", error);
      setPages((prevPages) =>
        prevPages.map((page) =>
          page.id === pageId
            ? { ...page, components: [...page.components, componentToRemove] }
            : page
        )
      );
      toast({
        title: "Error",
        description: "Failed to remove component. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderComponent = (component: ComponentData) => {
    switch (component.type) {
      case "navbar":
        return <Navbar key={component.id} {...component.data} />;
      case "hero":
        return <Hero key={component.id} {...component.data} />;
      case "grid":
        return <Grid key={component.id} {...component.data} />;
      case "form":
        return <Form key={component.id} {...component.data} />;
      case "footer":
        return <Footer key={component.id} {...component.data} />;
      case "carousel":
        return <Carousel key={component.id} carouselState={component.data} />;
      default:
        return null;
    }
  };

  const deletePage = async (pageId: string) => {
    try {
      const result = await deleteBlogPage(slug, pageId);
      if (result.success) {
        setPages((prevPages) => prevPages.filter((page) => page.id !== pageId));
        if (currentPageId === pageId) {
          const newCurrentPage = pages.find((page) => page.id !== pageId);
          setCurrentPageId(newCurrentPage?.id || null);
        }
        toast({
          title: "Success",
          description: "Page deleted successfully.",
        });
      } else {
        throw new Error(result.error || "Failed to delete page");
      }
    } catch (error) {
      console.error("Failed to delete page:", error);
      toast({
        title: "Error",
        description: "Failed to delete page. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <MainContent
        slug={slug}
        isPreviewMode={isPreviewMode}
        setIsPreviewMode={setIsPreviewMode}
        pages={pages}
        currentPageId={currentPageId}
        setCurrentPageId={setCurrentPageId}
        renderComponent={renderComponent}
        removeComponent={removeComponent}
        pageState={pageState}
        setPages={setPages}
        addComponent={addComponent}
        deletePage={deletePage}
      />
      <Sidebar
        navbarState={navbarState}
        setNavbarState={setNavbarState}
        heroState={heroState}
        setHeroState={setHeroState}
        gridState={gridState}
        setGridState={setGridState}
        formState={formState}
        setFormState={setFormState}
        footerState={footerState}
        setFooterState={setFooterState}
        pageState={pageState}
        setPageState={updatePageSettings}
        carouselState={carouselState}
        setCarouselState={setCarouselState}
        addComponent={addComponent}
        pages={pages}
        currentPageId={currentPageId}
      />
    </div>
  );
}
