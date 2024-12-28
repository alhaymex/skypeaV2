import React, { useState } from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, HelpCircle } from "lucide-react";
import { GridItem } from "@/types/types";
import { gridTemplates } from "@/lib/constants";
import GridUploadButton from "@/components/upload-buttons/GridUploadButton";
import Image from "next/image";

interface GridAccordionProps {
  gridState: any;
  setGridState: (value: any) => void;
  addComponent: (componentType: string, isDynamic?: boolean) => void;
}

export function GridAccordion({
  gridState,
  setGridState,
  addComponent,
}: GridAccordionProps) {
  const [isDynamicBlog, setIsDynamicBlog] = useState(false);

  const addGridItem = () => {
    const newItem: GridItem = {
      id: Date.now().toString(),
      title: `Item ${gridState.items.length + 1}`,
      description: `Description for Item ${gridState.items.length + 1}`,
      imageUrl: "https://image.alhaymex.com/placeholder?height=200&width=200",
      author: "Author Name",
      date: new Date().toISOString().split("T")[0],
      tags: ["Tag 1", "Tag 2"],
      rating: 5,
      role: "Role",
    };
    setGridState((prev: any) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const updateGridItem = (id: string, field: keyof GridItem, value: any) => {
    setGridState((prev: any) => ({
      ...prev,
      items: prev.items.map((item: GridItem) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeGridItem = (id: string) => {
    setGridState((prev: any) => ({
      ...prev,
      items: prev.items.filter((item: GridItem) => item.id !== id),
    }));
  };

  const addDynamicGrid = () => {
    const defaultItems = [
      {
        id: "default-1",
        title: "Default Blog Post 1",
        description: "This is a placeholder for the first blog post.",
        imageUrl: "https://image.alhaymex.com/initials?initials=JD",
        author: "John Doe",
        date: new Date().toISOString().split("T")[0],
      },
      {
        id: "default-2",
        title: "Default Blog Post 2",
        description: "This is a placeholder for the second blog post.",
        imageUrl: "https://image.alhaymex.com/initials?initials=JS",
        author: "Jane Smith",
        date: new Date().toISOString().split("T")[0],
      },
      {
        id: "default-3",
        title: "Default Blog Post 3",
        description: "This is a placeholder for the third blog post.",
        imageUrl: "https://image.alhaymex.com/initials?initials=AJ",
        author: "Alex Johnson",
        date: new Date().toISOString().split("T")[0],
      },
    ];

    setGridState({
      template: "blog",
      columns: 3,
      items: defaultItems,
      isDynamic: true,
    });

    addComponent("grid", true);
  };

  return (
    <AccordionItem value="grid" className="border-amber-200">
      <AccordionTrigger className="text-amber-900 hover:text-amber-700">
        Grid
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          {/* Dynamic Blog Toggle */}
          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100">
            <div className="flex items-center space-x-2">
              <Switch
                checked={isDynamicBlog}
                onCheckedChange={setIsDynamicBlog}
                id="dynamic-blog"
                className="data-[state=checked]:bg-amber-500"
              />
              <Label htmlFor="dynamic-blog" className="text-amber-900">
                Dynamic Blog
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 text-amber-600 hover:text-amber-700"
                        >
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="border-amber-200">
                        <DialogHeader>
                          <DialogTitle className="text-amber-900">
                            Dynamic Blog
                          </DialogTitle>
                          <DialogDescription className="text-amber-700">
                            When enabled, this option allows you to use the blog
                            you created dynamically. It will create a grid with
                            placeholder content that can be automatically
                            populated with your actual blog posts.
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </TooltipTrigger>
                  <TooltipContent className="bg-amber-50 border-amber-200">
                    <p className="text-amber-900">
                      Use your blog content dynamically
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Grid Template */}
          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100">
            <Label className="text-amber-900">Grid Template</Label>
            <Select
              value={gridState.template}
              onValueChange={(value) =>
                setGridState((prev: any) => ({ ...prev, template: value }))
              }
              disabled={isDynamicBlog}
            >
              <SelectTrigger className="mt-2 border-amber-200 focus:ring-amber-400">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent className="bg-white border-amber-200">
                {gridTemplates.map((template) => (
                  <SelectItem key={template.value} value={template.value}>
                    {template.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Columns Slider */}
          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100">
            <Label className="text-amber-900">Number of Columns</Label>
            <div className="flex items-center space-x-4 mt-2">
              <Slider
                value={[gridState.columns]}
                onValueChange={(value) =>
                  setGridState((prev: any) => ({ ...prev, columns: value[0] }))
                }
                min={1}
                max={4}
                step={1}
                disabled={isDynamicBlog}
                className="flex-1"
              />
              <span className="text-amber-900 font-medium w-8 text-center">
                {gridState.columns}
              </span>
            </div>
          </div>

          {/* Grid Items */}
          {!isDynamicBlog && (
            <div className="space-y-4">
              <Label className="text-amber-900">Grid Items</Label>
              {gridState.items.map((item: GridItem) => (
                <Accordion key={item.id} type="single" collapsible>
                  <AccordionItem
                    value={`grid-item-${item.id}`}
                    className="border border-amber-200 rounded-lg overflow-hidden bg-white/50"
                  >
                    <AccordionTrigger className="px-4 text-amber-900 hover:text-amber-700">
                      {item.title || `Item ${item.id}`}
                    </AccordionTrigger>
                    <AccordionContent className="p-4 space-y-4 bg-gradient-to-b from-amber-50/30 to-transparent">
                      <Input
                        placeholder="Title"
                        value={item.title}
                        onChange={(e) =>
                          updateGridItem(item.id, "title", e.target.value)
                        }
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                      <Textarea
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) =>
                          updateGridItem(item.id, "description", e.target.value)
                        }
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      />

                      {/* Image Upload Section */}
                      <div className="space-y-2">
                        <GridUploadButton
                          setGridState={setGridState}
                          itemId={item.id}
                          currentImageUrl={item.imageUrl}
                        />
                        {item.imageUrl && (
                          <div className="relative w-full h-40 rounded-lg overflow-hidden border border-amber-200">
                            <Image
                              src={item.imageUrl}
                              alt={item.title || `Grid item ${item.id}`}
                              layout="fill"
                              objectFit="cover"
                              className="transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        )}
                      </div>

                      {/* Template Specific Fields */}
                      {/* ... (keep existing template-specific fields with similar styling) ... */}

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeGridItem(item.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Remove Item
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={addGridItem}
                className="mt-2 border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Grid Item
              </Button>
            </div>
          )}

          {/* Add Grid Button */}
          <Button
            onClick={() => {
              if (isDynamicBlog) {
                addDynamicGrid();
              } else {
                addComponent("grid");
              }
            }}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            style={{
              clipPath:
                "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
            }}
          >
            Add Grid
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
