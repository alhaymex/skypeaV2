import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion } from "@/components/ui/accordion";
import { NavbarAccordion } from "./NavbarAccordion";
import { HeroAccordion } from "./HeroAccordion";
import { GridAccordion } from "./GridAccordion";
import { FormAccordion } from "./FormAccordion";
import { PageCustomizationAccordion } from "./PageCustomizer";

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
  addComponent: (componentType: string) => void;
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
  addComponent,
}: SidebarProps) {
  return (
    <aside className="w-80 bg-muted p-4 overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Page Builder</h2>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <Accordion type="single" collapsible className="w-full">
          <PageCustomizationAccordion
            pageState={pageState}
            setPageState={setPageState}
          />
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
        </Accordion>
      </ScrollArea>
    </aside>
  );
}
