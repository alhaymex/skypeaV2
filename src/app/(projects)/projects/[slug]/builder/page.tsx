"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ComponentData, NavLink, GridItem, FormField } from "@/types/types";
import { Navbar } from "@/components/templates/Navbar";
import { Hero } from "@/components/templates/Hero";
import { Grid } from "@/components/templates/Grid";
import { Form } from "@/components/templates/Form";
import { MainContent } from "@/components/pages/projects/builder/MainContent";
import { Sidebar } from "@/components/pages/projects/builder/BuilderSidebar";
import { saveComponent } from "@/actions/blogs-actions";
import { useToast } from "@/hooks/use-toast";

export default function BlogBuilder() {
  const { slug } = useParams() as { slug: string };
  const [selectedComponents, setSelectedComponents] = useState<ComponentData[]>(
    []
  );
  const [isPreviewMode, setIsPreviewMode] = useState(false);
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
    linkBorderRadius: 4,
  });

  // Hero state
  const [heroState, setHeroState] = useState({
    title: "Welcome to My Blog",
    subtitle: "Discover amazing content and insights",
    backgroundImage: "/placeholder.svg?height=1080&width=1920",
    ctaText: "Get Started",
    ctaLink: "#",
  });

  // Grid state
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
    title: "Contact Us",
    description:
      "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
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
      {
        id: "3",
        label: "Message",
        type: "textarea" as const,
        placeholder: "Enter your message",
        required: true,
      },
    ] as FormField[],
    submitButtonText: "Send Message",
  });

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
            linkBorderRadius: navbarState.linkBorderRadius,
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
      default:
        return;
    }

    // Optimistically update the UI
    setSelectedComponents((prevComponents) => [
      ...prevComponents,
      newComponent,
    ]);

    try {
      const result = await saveComponent(slug as string, newComponent);

      if (!result.success) {
        throw new Error("Failed to save component");
      }

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

  const removeComponent = (index: number) => {
    setSelectedComponents(selectedComponents.filter((_, i) => i !== index));
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
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <MainContent
        slug={slug}
        isPreviewMode={isPreviewMode}
        setIsPreviewMode={setIsPreviewMode}
        selectedComponents={selectedComponents}
        renderComponent={renderComponent}
        removeComponent={removeComponent}
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
        addComponent={addComponent}
      />
    </div>
  );
}
