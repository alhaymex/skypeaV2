import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, ImageIcon } from "lucide-react";
import { NavLink } from "@/types/types";
import { navbarLayouts } from "@/lib/constants";

interface NavbarAccordionProps {
  navbarState: any;
  setNavbarState: (value: any) => void;
  addComponent: (componentType: string) => void;
}

const colorOptions = [
  { label: "White", value: "#ffffff" },
  { label: "Light Gray", value: "#f3f4f6" },
  { label: "Dark Gray", value: "#374151" },
  { label: "Black", value: "#000000" },
  { label: "Primary", value: "#3b82f6" },
  { label: "Secondary", value: "#10b981" },
];

export function NavbarAccordion({
  navbarState,
  setNavbarState,
  addComponent,
}: NavbarAccordionProps) {
  const updateNavLink = (
    id: string,
    field: keyof NavLink,
    value: string,
    parentId?: string
  ) => {
    setNavbarState((prev: any) => ({
      ...prev,
      links: prev.links.map((link: NavLink) => {
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
      }),
    }));
  };

  const addNavLink = (parentId?: string) => {
    const newLink: NavLink = {
      id: Date.now().toString(),
      text: "",
      href: "",
      target: "_self",
      variant: "default",
    };
    setNavbarState((prev: any) => ({
      ...prev,
      links: parentId
        ? prev.links.map((link: NavLink) =>
            link.id === parentId
              ? {
                  ...link,
                  dropdownItems: [...(link.dropdownItems || []), newLink],
                }
              : link
          )
        : [...prev.links, newLink],
    }));
  };

  const removeNavLink = (id: string, parentId?: string) => {
    setNavbarState((prev: any) => ({
      ...prev,
      links: parentId
        ? prev.links.map((link: NavLink) =>
            link.id === parentId
              ? {
                  ...link,
                  dropdownItems: link.dropdownItems?.filter(
                    (item) => item.id !== id
                  ),
                }
              : link
          )
        : prev.links.filter((link: NavLink) => link.id !== id),
    }));
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
    <AccordionItem value="navbar">
      <AccordionTrigger>Navbar</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div>
            <Label>Navbar Layout</Label>
            <Select
              value={navbarState.layout}
              onValueChange={(value) =>
                setNavbarState((prev: any) => ({ ...prev, layout: value }))
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
              value={navbarState.titleType}
              onValueChange={(value) =>
                setNavbarState((prev: any) => ({ ...prev, titleType: value }))
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
          {navbarState.titleType === "text" ? (
            <div>
              <Label htmlFor="navbar-title">Navbar Title</Label>
              <Input
                id="navbar-title"
                value={navbarState.title}
                onChange={(e) =>
                  setNavbarState((prev: any) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="navbar-logo">Navbar Logo URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="navbar-logo"
                  value={navbarState.logoUrl}
                  onChange={(e) =>
                    setNavbarState((prev: any) => ({
                      ...prev,
                      logoUrl: e.target.value,
                    }))
                  }
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setNavbarState((prev: any) => ({
                      ...prev,
                      logoUrl: "/placeholder.svg?height=32&width=32",
                    }))
                  }
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          <div>
            <Label>Background Color</Label>
            <Select
              value={navbarState.backgroundColor}
              onValueChange={(value) =>
                setNavbarState((prev: any) => ({
                  ...prev,
                  backgroundColor: value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select background color" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Text Color</Label>
            <Select
              value={navbarState.textColor}
              onValueChange={(value) =>
                setNavbarState((prev: any) => ({ ...prev, textColor: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select text color" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Navigation Links</Label>
            {navbarState.links.map((link: NavLink) => (
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
                                {renderNavLinkFields(dropdownLink, link.id)}
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
          <Button onClick={() => addComponent("navbar")} className="w-full">
            Add Navbar
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
