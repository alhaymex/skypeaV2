"use client";

import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion } from "@/components/ui/accordion";
import { NavbarAccordion } from "./NavbarAccordion";
import { HeroAccordion } from "./HeroAccordion";
import { GridAccordion } from "./GridAccordion";
import { FormAccordion } from "./FormAccordion";
import { PageCustomizationAccordion } from "./PageCustomizer";
import { FooterAccordion } from "./FooterAccordion";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import { CarouselAccordion } from "./CarouselAccordion";

interface SidebarProps {
  navbarState: any;
  setNavbarState: (value: any) => void;
  heroState: any;
  setHeroState: (value: any) => void;
  gridState: any;
  setGridState: (value: any) => void;
  formState: any;
  setFormState: (value: any) => void;
  pageState: any;
  setPageState: (value: any) => void;
  footerState: any;
  setFooterState: (value: any) => void;
  carouselState: any;
  setCarouselState: (value: any) => void;
  addComponent: (componentType: string) => Promise<void>;
  pages: { id: string; name: string; components: any[] }[];
  currentPageId: string | null;
}

export function Sidebar({
  navbarState,
  setNavbarState,
  heroState,
  setHeroState,
  gridState,
  setGridState,
  formState,
  setFormState,
  pageState,
  setPageState,
  footerState,
  setFooterState,
  carouselState,
  setCarouselState,
  addComponent,
  pages,
  currentPageId,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentPage = pages.find((page) => page.id === currentPageId);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle button for mobile */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-2 right-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-80 bg-muted p-4 overflow-auto transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}
      >
        <h2 className="text-lg font-semibold mb-4">Page Builder</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <Accordion type="single" collapsible className="w-full">
            <PageCustomizationAccordion
              pageState={pageState}
              setPageState={setPageState}
            />
            {currentPage && (
              <>
                <NavbarAccordion
                  navbarState={navbarState}
                  setNavbarState={setNavbarState}
                  addComponent={addComponent}
                />
                <HeroAccordion
                  heroState={heroState}
                  setHeroState={setHeroState}
                  addComponent={addComponent}
                />
                <GridAccordion
                  gridState={gridState}
                  setGridState={setGridState}
                  addComponent={addComponent}
                />
                <FormAccordion
                  formState={formState}
                  setFormState={setFormState}
                  addComponent={addComponent}
                />
                <FooterAccordion
                  footerState={footerState}
                  setFooterState={setFooterState}
                  addComponent={addComponent}
                />
                <CarouselAccordion
                  carouselState={carouselState}
                  setCarouselState={setCarouselState}
                  addComponent={addComponent}
                />
              </>
            )}
          </Accordion>
        </ScrollArea>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
