import React from "react";
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
import { Plus, Trash2 } from "lucide-react";
import { NavLink } from "@/types/types";
import { navbarLayouts } from "@/lib/constants";
import NavbarLogoUploadButton from "@/components/upload-buttons/NavbarLogoUploadButton";
import Image from "next/image";
import { colorOptions } from "@/utils/colors";

interface NavbarAccordionProps {
  navbarState: any;
  setNavbarState: (value: any) => void;
  addComponent: (componentType: string) => void;
}

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
    <AccordionItem value="navbar" className="border-amber-200">
      <AccordionTrigger className="text-amber-900 hover:text-amber-700">
        Navbar
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100">
            <Label className="text-amber-900">Navbar Layout</Label>
            <Select
              value={navbarState.layout}
              onValueChange={(value) =>
                setNavbarState((prev: any) => ({ ...prev, layout: value }))
              }
            >
              <SelectTrigger className="mt-2 border-amber-200 focus:ring-amber-400">
                <SelectValue placeholder="Select layout" />
              </SelectTrigger>
              <SelectContent className="bg-white border-amber-200">
                {navbarLayouts.map((layout) => (
                  <SelectItem key={layout.value} value={layout.value}>
                    {layout.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100">
            <Label className="text-amber-900">Navbar Title Type</Label>
            <RadioGroup
              value={navbarState.titleType}
              onValueChange={(value) =>
                setNavbarState((prev: any) => ({ ...prev, titleType: value }))
              }
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="text"
                  id="title-text"
                  className="text-amber-600"
                />
                <Label htmlFor="title-text" className="text-amber-900">
                  Text
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="image"
                  id="title-image"
                  className="text-amber-600"
                />
                <Label htmlFor="title-image" className="text-amber-900">
                  Image
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100">
            {navbarState.titleType === "text" ? (
              <div>
                <Label htmlFor="navbar-title" className="text-amber-900">
                  Navbar Title
                </Label>
                <Input
                  id="navbar-title"
                  value={navbarState.title}
                  onChange={(e) =>
                    setNavbarState((prev: any) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="mt-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
            ) : (
              <div>
                <Label className="text-amber-900">Navbar Logo</Label>
                <div className="space-y-2 mt-2">
                  <NavbarLogoUploadButton
                    setNavbarState={setNavbarState}
                    currentLogoUrl={navbarState.logoUrl}
                  />
                  {navbarState.logoUrl && (
                    <div className="relative w-full h-20 rounded-lg overflow-hidden border border-amber-200">
                      <Image
                        src={navbarState.logoUrl}
                        alt="Navbar logo"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100">
            <Label className="text-amber-900">Background Color</Label>
            <Select
              value={navbarState.backgroundColor}
              onValueChange={(value) =>
                setNavbarState((prev: any) => ({
                  ...prev,
                  backgroundColor: value,
                }))
              }
            >
              <SelectTrigger className="mt-2 border-amber-200 focus:ring-amber-400">
                <SelectValue placeholder="Select background color" />
              </SelectTrigger>
              <SelectContent className="bg-white border-amber-200">
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

          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100">
            <Label className="text-amber-900">Text Color</Label>
            <Select
              value={navbarState.textColor}
              onValueChange={(value) =>
                setNavbarState((prev: any) => ({ ...prev, textColor: value }))
              }
            >
              <SelectTrigger className="mt-2 border-amber-200 focus:ring-amber-400">
                <SelectValue placeholder="Select text color" />
              </SelectTrigger>
              <SelectContent className="bg-white border-amber-200">
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

          <div className="space-y-3">
            <Label className="text-amber-900">Navigation Links</Label>
            {navbarState.links.map((link: NavLink) => (
              <Accordion
                key={link.id}
                type="single"
                collapsible
                className="border-amber-200"
              >
                <AccordionItem value={`link-${link.id}`}>
                  <AccordionTrigger className="text-amber-900 hover:text-amber-700">
                    {link.text || `Link ${link.id}`}
                  </AccordionTrigger>
                  <AccordionContent>
                    {renderNavLinkFields(link)}
                    {link.dropdownItems && (
                      <div className="mt-3 space-y-2">
                        <Label className="text-amber-900">Dropdown Items</Label>
                        {link.dropdownItems.map((dropdownLink) => (
                          <Accordion
                            key={dropdownLink.id}
                            type="single"
                            collapsible
                            className="border-amber-200"
                          >
                            <AccordionItem
                              value={`dropdown-${dropdownLink.id}`}
                            >
                              <AccordionTrigger className="text-amber-900 hover:text-amber-700">
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
              className="mt-2 border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Link
            </Button>
          </div>

          <Button
            onClick={() => addComponent("navbar")}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            style={{
              clipPath:
                "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
            }}
          >
            Add Navbar
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
