"use client";

import { addBlogPage } from "@/actions/blogs-actions";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ComponentData } from "@/types/types";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import NewBlogPageButton from "./NewBlogPageButton";

export interface Page {
  id: string;
  name: string;
  slug: string;
  components: ComponentData[];
}

interface MainContentProps {
  slug: string;
  isPreviewMode: boolean;
  setIsPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
  pages: Page[];
  currentPageId: string | null;
  setCurrentPageId: React.Dispatch<React.SetStateAction<string | null>>;
  renderComponent: (component: ComponentData) => React.ReactNode;
  removeComponent: (pageId: string, componentId: string) => Promise<void>;
  pageState: {
    backgroundColor: string;
    fontFamily: string;
  };
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  addComponent: (componentType: string) => Promise<void>;
  deletePage: (pageId: string) => Promise<void>;
}

export function MainContent({
  slug,
  isPreviewMode,
  setIsPreviewMode,
  pages,
  currentPageId,
  setCurrentPageId,
  renderComponent,
  removeComponent,
  pageState,
  setPages,
  addComponent,
  deletePage,
}: MainContentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [isValidPageName, setIsValidPageName] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const { toast } = useToast();

  const validatePageName = useCallback(
    (name: string) => {
      if (name.trim().length === 0) {
        setIsValidPageName(false);
        setValidationMessage("");
        return;
      }

      if (name.trim().toLowerCase() === "home") {
        setIsValidPageName(false);
        setValidationMessage("A page cannot be called 'home'.");
        return;
      }

      if (
        pages.some(
          (page) => page.name.toLowerCase() === name.trim().toLowerCase()
        )
      ) {
        setIsValidPageName(false);
        setValidationMessage("A page with this name already exists.");
        return;
      }

      if (name.trim().length < 3) {
        setIsValidPageName(false);
        setValidationMessage("Page name must be at least 3 characters long.");
        return;
      }

      setIsValidPageName(true);
      setValidationMessage("");
    },
    [pages]
  );

  useEffect(() => {
    validatePageName(newPageName);
  }, [newPageName, validatePageName]);

  const addNewPage = async () => {
    if (isValidPageName) {
      const pageSlug = newPageName.trim().toLowerCase().replace(/\s+/g, "-");
      const result = await addBlogPage(slug, newPageName.trim(), pageSlug);

      if (result.success && result.page) {
        const newPage: Page = {
          id: result.page.id,
          name: result.page.name,
          slug: result.page.slug,
          components: [],
        };
        setPages((prevPages) => [...prevPages, newPage]);
        setCurrentPageId(newPage.id);
        setNewPageName("");
        setIsDialogOpen(false);
        toast({
          title: "Success",
          description: "New page added successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add new page. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeletePage = async (pageId: string) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      await deletePage(pageId);
    }
  };

  const currentPage = pages.find((page) => page.id === currentPageId);

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-b from-amber-50/30 to-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-amber-200 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-amber-900">
          Blog Builder: {slug}
        </h1>
        <Button
          variant="outline"
          size="sm"
          className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
          onClick={() => setIsPreviewMode(!isPreviewMode)}
        >
          {isPreviewMode ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" /> Exit Preview
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" /> Preview
            </>
          )}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        value={currentPageId || undefined}
        onValueChange={setCurrentPageId}
        className="w-full"
      >
        <div className="flex items-center border-b border-amber-200 px-4 bg-white">
          <TabsList className="bg-amber-50/50">
            {pages.map((page) => (
              <TabsTrigger
                key={page.id}
                value={page.id}
                className="flex items-center group data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 text-amber-700 hover:text-amber-800"
              >
                <span>{page.name}</span>
                {page.name !== "Home" && (
                  <span
                    className="ml-2 p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePage(page.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <NewBlogPageButton
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            newPageName={newPageName}
            setNewPageName={setNewPageName}
            addNewPage={addNewPage}
            isValidPageName={isValidPageName}
            validationMessage={validationMessage}
            pages={pages}
          />
        </div>

        {/* Page Content */}
        {pages.map((page) => (
          <TabsContent key={page.id} value={page.id}>
            <div
              className="min-h-screen"
              style={{
                backgroundColor: pageState.backgroundColor,
                fontFamily: pageState.fontFamily,
              }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {page.components.map((component) => (
                  <div
                    key={component.id}
                    className={`relative mb-8 group ${
                      !isPreviewMode
                        ? "border-2 border-dashed border-amber-200 rounded-lg p-4 transition-all hover:border-amber-300"
                        : ""
                    }`}
                  >
                    {renderComponent(component)}
                    {!isPreviewMode && (
                      <>
                        <div className="absolute -top-3 left-4 bg-white px-2 text-sm text-amber-600 z-10 font-medium border border-amber-200 rounded-full">
                          {component.type}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50 bg-red-500 hover:bg-red-600"
                          onClick={() => removeComponent(page.id, component.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                ))}
                {!isPreviewMode && page.components.length === 0 && (
                  <div className="text-center py-12">
                    <div className="p-8 rounded-lg border-2 border-dashed border-amber-200 bg-amber-50/30">
                      <div className="relative">
                        {/* Decorative hexagons */}
                        <div
                          className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-100 opacity-50"
                          style={{
                            clipPath:
                              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                          }}
                        />
                        <div
                          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-200 opacity-30"
                          style={{
                            clipPath:
                              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                          }}
                        />
                        <p className="text-amber-700 relative z-10">
                          No components added yet. Use the sidebar to add
                          components.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
