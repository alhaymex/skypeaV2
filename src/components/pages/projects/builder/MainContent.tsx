"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ComponentData } from "@/types/types";
import { Eye, EyeOff, Trash2, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addBlogPage } from "@/actions/blogs-actions";
import { useToast } from "@/hooks/use-toast";

interface Page {
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
}: MainContentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const { toast } = useToast();

  const addNewPage = async () => {
    if (newPageName.trim()) {
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

  const currentPage = pages.find((page) => page.id === currentPageId);

  return (
    <div className="flex-1 overflow-auto">
      <div className="sticky top-0 z-20 bg-background border-b p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Builder: {slug}</h1>
        <Button
          variant="outline"
          size="sm"
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
      <Tabs
        value={currentPageId || undefined}
        onValueChange={setCurrentPageId}
        className="w-full"
      >
        <div className="flex items-center border-b px-4">
          <TabsList>
            {pages.map((page) => (
              <TabsTrigger key={page.id} value={page.id}>
                {page.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-2">
                <Plus className="h-4 w-4 mr-2" /> Add Page
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Page</DialogTitle>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <Input
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  placeholder="Enter page name (the URL will be /page-name)"
                />
                <Button onClick={addNewPage}>Add</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
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
                        ? "border-2 border-dashed border-gray-300 p-4"
                        : ""
                    }`}
                  >
                    {renderComponent(component)}
                    {!isPreviewMode && (
                      <>
                        <div className="absolute -top-3 left-4 bg-white px-2 text-sm text-gray-500 z-10">
                          {component.type}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50"
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
                    <p className="text-gray-500">
                      No components added yet. Use the sidebar to add
                      components.
                    </p>
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
