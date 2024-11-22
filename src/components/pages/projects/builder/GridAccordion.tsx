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
import { Plus, ImageIcon } from "lucide-react";
import { GridItem } from "@/types/types";
import { gridTemplates } from "@/lib/constants";

interface GridAccordionProps {
  gridState: any;
  setGridState: (value: any) => void;
  addComponent: (componentType: string) => void;
}

export function GridAccordion({
  gridState,
  setGridState,
  addComponent,
}: GridAccordionProps) {
  const addGridItem = () => {
    const newItem: GridItem = {
      id: Date.now().toString(),
      title: `Item ${gridState.items.length + 1}`,
      description: `Description for Item ${gridState.items.length + 1}`,
      imageUrl: "/placeholder.svg?height=200&width=200",
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

  return (
    <AccordionItem value="grid">
      <AccordionTrigger>Grid</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div>
            <Label>Grid Template</Label>
            <Select
              value={gridState.template}
              onValueChange={(value) =>
                setGridState((prev: any) => ({ ...prev, template: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                {gridTemplates.map((template) => (
                  <SelectItem key={template.value} value={template.value}>
                    {template.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Number of Columns</Label>
            <div className="flex items-center space-x-2">
              <Slider
                value={[gridState.columns]}
                onValueChange={(value) =>
                  setGridState((prev: any) => ({ ...prev, columns: value[0] }))
                }
                min={1}
                max={4}
                step={1}
              />
              <span>{gridState.columns}</span>
            </div>
          </div>
          <div>
            <Label>Grid Items</Label>
            {gridState.items.map((item: GridItem) => (
              <Accordion key={item.id} type="single" collapsible>
                <AccordionItem value={`grid-item-${item.id}`}>
                  <AccordionTrigger>
                    {item.title || `Item ${item.id}`}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Input
                        placeholder="Title"
                        value={item.title}
                        onChange={(e) =>
                          updateGridItem(item.id, "title", e.target.value)
                        }
                      />
                      <Textarea
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) =>
                          updateGridItem(item.id, "description", e.target.value)
                        }
                      />
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Image URL"
                          value={item.imageUrl}
                          onChange={(e) =>
                            updateGridItem(item.id, "imageUrl", e.target.value)
                          }
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateGridItem(
                              item.id,
                              "imageUrl",
                              "/placeholder.svg?height=200&width=200"
                            )
                          }
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      {gridState.template === "blog" && (
                        <>
                          <Input
                            placeholder="Author"
                            value={item.author}
                            onChange={(e) =>
                              updateGridItem(item.id, "author", e.target.value)
                            }
                          />
                          <Input
                            type="date"
                            value={item.date}
                            onChange={(e) =>
                              updateGridItem(item.id, "date", e.target.value)
                            }
                          />
                        </>
                      )}
                      {gridState.template === "testimonial" && (
                        <>
                          <Input
                            placeholder="Author"
                            value={item.author}
                            onChange={(e) =>
                              updateGridItem(item.id, "author", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Role"
                            value={item.role}
                            onChange={(e) =>
                              updateGridItem(item.id, "role", e.target.value)
                            }
                          />
                          <div className="flex items-center space-x-2">
                            <Label>Rating</Label>
                            <Slider
                              value={[item.rating || 0]}
                              onValueChange={(value) =>
                                updateGridItem(item.id, "rating", value[0])
                              }
                              max={5}
                              step={1}
                            />
                            <span>{item.rating}</span>
                          </div>
                        </>
                      )}
                      {gridState.template === "feature" && (
                        <Input
                          placeholder="Tags (comma-separated)"
                          value={item.tags?.join(", ")}
                          onChange={(e) =>
                            updateGridItem(
                              item.id,
                              "tags",
                              e.target.value.split(",").map((tag) => tag.trim())
                            )
                          }
                        />
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeGridItem(item.id)}
                      >
                        Remove Item
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addGridItem}
              className="mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Grid Item
            </Button>
          </div>
          <Button onClick={() => addComponent("grid")} className="w-full">
            Add Grid
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
