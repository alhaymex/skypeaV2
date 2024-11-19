"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "@/components/templates/Navbar";
import { Hero } from "@/components/templates/Hero";
import { Grid } from "@/components/templates/Grid";
import { Form } from "@/components/templates/Form";
import {
  Eye,
  EyeOff,
  Plus,
  Trash2,
  ImageIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

interface ComponentData {
  type: string;
  id: string;
  data: any;
}

interface NavLink {
  id: string;
  text: string;
  href: string;
  target: string;
  variant: "default" | "primary" | "secondary";
  dropdownItems?: NavLink[];
}

const navbarLayouts = [
  { value: "default", label: "Default" },
  { value: "centered", label: "Centered" },
  { value: "split", label: "Split" },
];

export default function BlogBuilder() {
  const { slug } = useParams();
  const [selectedComponents, setSelectedComponents] = useState<ComponentData[]>(
    []
  );
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Navbar state
  const [navbarTitleType, setNavbarTitleType] = useState<"text" | "image">(
    "text"
  );
  const [navbarTitle, setNavbarTitle] = useState("My Blog");
  const [navbarLogoUrl, setNavbarLogoUrl] = useState(
    "/placeholder.svg?height=32&width=32"
  );
  const [navLinks, setNavLinks] = useState<NavLink[]>([
    { id: "1", text: "Home", href: "/", target: "_self", variant: "default" },
    {
      id: "2",
      text: "About",
      href: "/about",
      target: "_self",
      variant: "default",
    },
  ]);
  const [navbarLayout, setNavbarLayout] = useState<
    "default" | "centered" | "split"
  >("default");
  const [linkBorderRadius, setLinkBorderRadius] = useState(4);

  // Hero state
  const [heroTitle, setHeroTitle] = useState("Welcome to My Blog");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Discover amazing content and insights"
  );
  const [heroBackgroundImage, setHeroBackgroundImage] = useState(
    "/placeholder.svg?height=1080&width=1920"
  );
  const [heroCtaText, setHeroCtaText] = useState("Get Started");
  const [heroCtaLink, setHeroCtaLink] = useState("#");

  const addComponent = (componentType: string) => {
    let newComponent: ComponentData;
    switch (componentType) {
      case "navbar":
        newComponent = {
          type: "navbar",
          id: `navbar-${Date.now()}`,
          data: {
            title: navbarTitleType === "text" ? navbarTitle : undefined,
            logoUrl: navbarTitleType === "image" ? navbarLogoUrl : undefined,
            links: navLinks,
            layout: navbarLayout,
            linkBorderRadius,
          },
        };
        break;
      case "hero":
        newComponent = {
          type: "hero",
          id: `hero-${Date.now()}`,
          data: {
            title: heroTitle,
            subtitle: heroSubtitle,
            backgroundImage: heroBackgroundImage,
            ctaText: heroCtaText,
            ctaLink: heroCtaLink,
          },
        };
        break;
      // Add cases for other component types here
      default:
        return;
    }
    setSelectedComponents([...selectedComponents, newComponent]);
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

  const addNavLink = (parentId?: string) => {
    const newLink: NavLink = {
      id: Date.now().toString(),
      text: "",
      href: "",
      target: "_self",
      variant: "default",
    };
    if (parentId) {
      setNavLinks((links) =>
        links.map((link) =>
          link.id === parentId
            ? {
                ...link,
                dropdownItems: [...(link.dropdownItems || []), newLink],
              }
            : link
        )
      );
    } else {
      setNavLinks((links) => [...links, newLink]);
    }
  };

  const updateNavLink = (
    id: string,
    field: keyof NavLink,
    value: string,
    parentId?: string
  ) => {
    setNavLinks((links) =>
      links.map((link) => {
        if (parentId) {
          if (link.id === parentId && link.dropdownItems) {
            return {
              ...link,
              dropdownItems: link.dropdownItems.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
              ),
            };
          }
          return link;
        }
        return link.id === id ? { ...link, [field]: value } : link;
      })
    );
  };

  const removeNavLink = (id: string, parentId?: string) => {
    if (parentId) {
      setNavLinks((links) =>
        links.map((link) =>
          link.id === parentId
            ? {
                ...link,
                dropdownItems: link.dropdownItems?.filter(
                  (item) => item.id !== id
                ),
              }
            : link
        )
      );
    } else {
      setNavLinks((links) => links.filter((link) => link.id !== id));
    }
  };

  const renderNavLinkFields = (link: NavLink, parentId?: string) => (
    <div key={link.id} className="space-y-2 mt-2">
      <Input
        placeholder="Link Text"
        value={link.text}
        onChange={(e) =>
          updateNavLink(link.id, "text", e.target.value, parentId)
        }
      />
      <Input
        placeholder="URL"
        value={link.href}
        onChange={(e) =>
          updateNavLink(link.id, "href", e.target.value, parentId)
        }
      />
      <div className="flex space-x-2">
        <Select
          value={link.target}
          onValueChange={(value) =>
            updateNavLink(link.id, "target", value, parentId)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Target" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_self">Same Tab</SelectItem>
            <SelectItem value="_blank">New Tab</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={link.variant}
          onValueChange={(value) =>
            updateNavLink(link.id, "variant", value, parentId)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="primary">Primary</SelectItem>
            <SelectItem value="secondary">Secondary</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeNavLink(link.id, parentId)}
        >
          <Trash2 className="h-4 w-4 mr-2" /> Remove
        </Button>
        {!parentId && (
          <Button variant="ghost" size="sm" onClick={() => addNavLink(link.id)}>
            <Plus className="h-4 w-4 mr-2" /> Add Dropdown
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Blog Builder for /{slug}</h1>
          <Button
            variant="outline"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            {isPreviewMode ? (
              <EyeOff className="mr-2 h-4 w-4" />
            ) : (
              <Eye className="mr-2 h-4 w-4" />
            )}
            {isPreviewMode ? "Exit Preview" : "Preview"}
          </Button>
        </div>
        <div
          className={`border-2 ${
            isPreviewMode
              ? "border-transparent"
              : "border-dashed border-gray-300"
          } rounded-lg min-h-[calc(100vh-8rem)] p-4`}
        >
          {selectedComponents.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              Add components to your blog
            </div>
          ) : (
            <div className="space-y-8">
              {selectedComponents.map((component, index) => (
                <div key={component.id} className="relative">
                  {renderComponent(component)}
                  {!isPreviewMode && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 z-30"
                      onClick={() => removeComponent(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <aside className="w-80 bg-muted p-4 overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Add Components</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="navbar">
              <AccordionTrigger>Navbar</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <Label>Navbar Layout</Label>
                    <Select
                      value={navbarLayout}
                      onValueChange={(value) =>
                        setNavbarLayout(
                          value as "default" | "centered" | "split"
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                      <SelectContent>
                        {navbarLayouts.map((layout) => (
                          <SelectItem key={layout.value} value={layout.value}>
                            {layout.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Navbar Title Type</Label>
                    <RadioGroup
                      defaultValue="text"
                      onValueChange={(value) =>
                        setNavbarTitleType(value as "text" | "image")
                      }
                      className="flex space-x-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="text" id="title-text" />
                        <Label htmlFor="title-text">Text</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="image" id="title-image" />
                        <Label htmlFor="title-image">Image</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {navbarTitleType === "text" ? (
                    <div>
                      <Label htmlFor="navbar-title">Navbar Title</Label>
                      <Input
                        id="navbar-title"
                        value={navbarTitle}
                        onChange={(e) => setNavbarTitle(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="navbar-logo">Navbar Logo URL</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="navbar-logo"
                          value={navbarLogoUrl}
                          onChange={(e) => setNavbarLogoUrl(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setNavbarLogoUrl(
                              "/placeholder.svg?height=32&width=32"
                            )
                          }
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  <div>
                    <Label>Link Border Radius</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        value={[linkBorderRadius]}
                        onValueChange={(value) => setLinkBorderRadius(value[0])}
                        max={20}
                        step={1}
                      />
                      <span>{linkBorderRadius}px</span>
                    </div>
                  </div>
                  <div>
                    <Label>Navigation Links</Label>
                    {navLinks.map((link) => (
                      <Accordion key={link.id} type="single" collapsible>
                        <AccordionItem value={`link-${link.id}`}>
                          <AccordionTrigger>
                            {link.text || `Link ${link.id}`}
                          </AccordionTrigger>
                          <AccordionContent>
                            {renderNavLinkFields(link)}
                            {link.dropdownItems && (
                              <div className="mt-2 space-y-2">
                                <Label>Dropdown Items</Label>
                                {link.dropdownItems.map((dropdownLink) => (
                                  <Accordion
                                    key={dropdownLink.id}
                                    type="single"
                                    collapsible
                                  >
                                    <AccordionItem
                                      value={`dropdown-${dropdownLink.id}`}
                                    >
                                      <AccordionTrigger>
                                        {dropdownLink.text ||
                                          `Dropdown Item ${dropdownLink.id}`}
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        {renderNavLinkFields(
                                          dropdownLink,
                                          link.id
                                        )}
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                ))}
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addNavLink()}
                      className="mt-2"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Link
                    </Button>
                  </div>
                  <Button
                    onClick={() => addComponent("navbar")}
                    className="w-full"
                  >
                    Add Navbar
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="hero">
              <AccordionTrigger>Hero</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="hero-title">Hero Title</Label>
                    <Input
                      id="hero-title"
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                    <Input
                      id="hero-subtitle"
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-background">
                      Background Image URL
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="hero-background"
                        value={heroBackgroundImage}
                        onChange={(e) => setHeroBackgroundImage(e.target.value)}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setHeroBackgroundImage(
                            "/placeholder.svg?height=1080&width=1920"
                          )
                        }
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="hero-cta-text">CTA Button Text</Label>
                    <Input
                      id="hero-cta-text"
                      value={heroCtaText}
                      onChange={(e) => setHeroCtaText(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-cta-link">CTA Button Link</Label>
                    <Input
                      id="hero-cta-link"
                      value={heroCtaLink}
                      onChange={(e) => setHeroCtaLink(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={() => addComponent("hero")}
                    className="w-full"
                  >
                    Add Hero
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* Add more AccordionItems for other component types */}
          </Accordion>
        </ScrollArea>
      </aside>
    </div>
  );
}
