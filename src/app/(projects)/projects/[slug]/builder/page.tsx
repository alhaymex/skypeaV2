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
import { MainContent } from "@/components/pages/projects/builder/MainContent";
import { Sidebar } from "@/components/pages/projects/builder/BuilderSidebar";
import {
  deleteComponent,
  getBlogComponents,
  getBlogSettings,
  saveComponent,
  updateBlogSettings,
} from "@/actions/blogs-actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function BlogBuilder() {
  const { slug } = useParams() as { slug: string };
  const [selectedComponents, setSelectedComponents] = useState<ComponentData[]>(
    []
  );
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();

  const [navbarState, setNavbarState] = useState({
    titleType: "text" as "text" | "image",
    title: "My Blog",
    logoUrl: "/placeholder.svg?height=32&width=32",
    links: [
      { id: "1", text: "Home", href: "/", target: "_self", variant: "default" },
      {
        id: "2",
        text: "About",
        href: "/about",
        target: "_self",
        variant: "default",
      },
    ] as NavLink[],
    layout: "default" as "default" | "centered" | "split",
    backgroundColor: "#ffffff",
    textColor: "#000000",
  });

  const [heroState, setHeroState] = useState({
    title: "Welcome to My Blog",
    subtitle: "Discover amazing content and insights",
    backgroundImage: "/placeholder.svg?height=1080&width=1920",
    ctaText: "Get Started",
    ctaLink: "#",
  });

  const [gridState, setGridState] = useState({
    items: [
      {
        id: "1",
        title: "Item 1",
        description: "Description for Item 1",
        imageUrl: "/placeholder.svg?height=200&width=200",
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
        imageUrl: "/placeholder.svg?height=200&width=200",
        author: "Jane Smith",
        date: "2023-05-02",
        tags: ["Tag 2", "Tag 3"],
        rating: 5,
        role: "Product Manager",
      },
    ] as GridItem[],
    columns: 3,
    template: "blog" as "blog" | "testimonial" | "feature",
  });

  const [formState, setFormState] = useState({
    title: "Subscribe to our newsletter",
    description:
      "Subscribe to our newsletter to stay up to date with the latest news and updates from our team.",
    fields: [
      {
        id: "1",
        label: "Name",
        type: "text" as const,
        placeholder: "Enter your name",
        required: true,
      },
      {
        id: "2",
        label: "Email",
        type: "email" as const,
        placeholder: "Enter your email",
        required: true,
      },
    ] as FormField[],
    submitButtonText: "Subscribe",
  });

  const [footerState, setFooterState] = useState({
    columns: [
      {
        title: "About Us",
        links: [
          { text: "Our Story", url: "#" },
          { text: "Team", url: "#" },
          { text: "Careers", url: "#" },
        ],
      },
      {
        title: "Services",
        links: [
          { text: "Web Design", url: "#" },
          { text: "Development", url: "#" },
          { text: "Marketing", url: "#" },
        ],
      },
      {
        title: "Contact",
        links: [
          { text: "Contact Us", url: "#" },
          { text: "Support", url: "#" },
        ],
      },
    ] as FooterColumn[],
    backgroundColor: "#f3f4f6",
    textColor: "#374151",
    showNewsletter: true,
    design: "simple" as "simple" | "multicolumn" | "newsletter",
    companyName: "Your Company Name",
  });

  const [pageState, setPageState] = useState({
    backgroundColor: "#ffffff",
    fontFamily: "sans-serif",
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [components, settings] = await Promise.all([
          getBlogComponents(slug),
          getBlogSettings(slug),
        ]);
        setSelectedComponents(components);
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
      await updateBlogSettings(
        slug,
        newSettings.backgroundColor,
        newSettings.fontFamily
      );
      setPageState(newSettings);
      toast({
        title: "Success",
        description: "Blog settings updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update blog settings:", error);
      toast({
        title: "Error",
        description: "Failed to update blog settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addComponent = async (componentType: string) => {
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
        newComponent = {
          type: "grid",
          id: `grid-${Date.now()}`,
          data: gridState,
        };
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
      default:
        return;
    }

    setSelectedComponents((prevComponents) => [
      ...prevComponents,
      newComponent,
    ]);

    try {
      const result = await saveComponent(slug, newComponent);

      if (!result.success) {
        throw new Error(result.message || "Failed to save component");
      }

      setSelectedComponents((prevComponents) =>
        prevComponents.map((component) =>
          component.id === newComponent.id
            ? { ...component, dbId: result.dbId }
            : component
        )
      );

      toast({
        title: "Component added",
        description: `${componentType} component has been added successfully.`,
      });
    } catch (error) {
      console.error("Failed to save component:", error);
      setSelectedComponents((prevComponents) =>
        prevComponents.filter((component) => component.id !== newComponent.id)
      );
      toast({
        title: "Error",
        description: "Failed to add component. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeComponent = async (clientId: string) => {
    const componentToRemove = selectedComponents.find((c) => c.id === clientId);
    if (!componentToRemove) {
      console.error("Component not found");
      toast({
        title: "Error",
        description:
          "Component not found. Please refresh the page and try again.",
        variant: "destructive",
      });
      return;
    }

    setSelectedComponents((prevComponents) =>
      prevComponents.filter((component) => component.id !== clientId)
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

      toast({
        title: "Component removed",
        description: "The component has been removed successfully.",
      });
    } catch (error) {
      console.error("Failed to delete component:", error);
      setSelectedComponents((prevComponents) => [
        ...prevComponents,
        componentToRemove,
      ]);
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
      default:
        return null;
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
        selectedComponents={selectedComponents}
        renderComponent={renderComponent}
        removeComponent={removeComponent}
        pageState={pageState}
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
        addComponent={addComponent}
      />
    </div>
  );
}
