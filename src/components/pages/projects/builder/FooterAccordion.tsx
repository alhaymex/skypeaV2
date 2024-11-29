"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
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
import { FooterColumn } from "@/types/types";
import { useCallback } from "react";

interface FooterAccordionProps {
  footerState: {
    columns: FooterColumn[];
    backgroundColor: string;
    textColor: string;
    showNewsletter: boolean;
    design: "simple" | "multicolumn" | "newsletter";
    companyName: string;
  };
  setFooterState: (value: any) => void;
  addComponent: (type: string) => void;
}

const colorOptions = [
  { label: "White", value: "#ffffff" },
  { label: "Light Gray", value: "#f3f4f6" },
  { label: "Dark Gray", value: "#374151" },
  { label: "Black", value: "#000000" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Green", value: "#10b981" },
  { label: "Red", value: "#ef4444" },
  { label: "Yellow", value: "#f59e0b" },
];

export function FooterAccordion({
  footerState,
  setFooterState,
  addComponent,
}: FooterAccordionProps) {
  const handleAddColumn = useCallback(() => {
    const newColumn: FooterColumn = {
      title: `Column ${footerState.columns.length + 1}`,
      links: [{ text: "New Link", url: "#" }],
    };

    setFooterState({
      ...footerState,
      columns: [...footerState.columns, newColumn],
    });
  }, [footerState, setFooterState]);

  const handleAddLink = useCallback(
    (columnIndex: number) => {
      const updatedColumns = [...footerState.columns];
      updatedColumns[columnIndex].links.push({
        text: "New Link",
        url: "#",
      });

      setFooterState({
        ...footerState,
        columns: updatedColumns,
      });
    },
    [footerState, setFooterState]
  );

  const handleUpdateColumn = useCallback(
    (columnIndex: number, field: string, value: string) => {
      const updatedColumns = [...footerState.columns];
      if (field === "title") {
        updatedColumns[columnIndex].title = value;
      }

      setFooterState({
        ...footerState,
        columns: updatedColumns,
      });
    },
    [footerState, setFooterState]
  );

  const handleUpdateLink = useCallback(
    (columnIndex: number, linkIndex: number, field: string, value: string) => {
      const updatedColumns = [...footerState.columns];
      if (field === "text") {
        updatedColumns[columnIndex].links[linkIndex].text = value;
      } else if (field === "url") {
        updatedColumns[columnIndex].links[linkIndex].url = value;
      }

      setFooterState({
        ...footerState,
        columns: updatedColumns,
      });
    },
    [footerState, setFooterState]
  );

  const handleRemoveColumn = useCallback(
    (columnIndex: number) => {
      const updatedColumns = footerState.columns.filter(
        (_, index) => index !== columnIndex
      );
      setFooterState({
        ...footerState,
        columns: updatedColumns,
      });
    },
    [footerState, setFooterState]
  );

  const handleRemoveLink = useCallback(
    (columnIndex: number, linkIndex: number) => {
      const updatedColumns = [...footerState.columns];
      updatedColumns[columnIndex].links = updatedColumns[
        columnIndex
      ].links.filter((_, index) => index !== linkIndex);

      setFooterState({
        ...footerState,
        columns: updatedColumns,
      });
    },
    [footerState, setFooterState]
  );

  return (
    <AccordionItem value="footer">
      <AccordionTrigger>Footer</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Design</Label>
            <Select
              value={footerState.design}
              onValueChange={(value) =>
                setFooterState({
                  ...footerState,
                  design: value as "simple" | "multicolumn" | "newsletter",
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Simple</SelectItem>
                <SelectItem value="multicolumn">Multi-column</SelectItem>
                <SelectItem value="newsletter">Newsletter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input
              value={footerState.companyName}
              onChange={(e) =>
                setFooterState({
                  ...footerState,
                  companyName: e.target.value,
                })
              }
              placeholder="Enter company name"
            />
          </div>

          <div className="space-y-2">
            <Label>Background Color</Label>
            <Select
              value={footerState.backgroundColor}
              onValueChange={(value) =>
                setFooterState({
                  ...footerState,
                  backgroundColor: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
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

          <div className="space-y-2">
            <Label>Text Color</Label>
            <Select
              value={footerState.textColor}
              onValueChange={(value) =>
                setFooterState({
                  ...footerState,
                  textColor: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
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

          <div className="space-y-2">
            <Label>Show Newsletter</Label>
            <Select
              value={footerState.showNewsletter ? "yes" : "no"}
              onValueChange={(value) =>
                setFooterState({
                  ...footerState,
                  showNewsletter: value === "yes",
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Columns</Label>
              <Button variant="outline" size="sm" onClick={handleAddColumn}>
                Add Column
              </Button>
            </div>

            {footerState.columns.map((column, columnIndex) => (
              <div
                key={`column-${columnIndex}`}
                className="space-y-4 border rounded-lg p-4"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 space-y-2">
                    <Label>Column Title</Label>
                    <Input
                      value={column.title}
                      onChange={(e) =>
                        handleUpdateColumn(columnIndex, "title", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveColumn(columnIndex)}
                  >
                    Remove
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Links</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddLink(columnIndex)}
                    >
                      Add Link
                    </Button>
                  </div>

                  {column.links.map((link, linkIndex) => (
                    <div
                      key={`link-${columnIndex}-${linkIndex}`}
                      className="space-y-2 border rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 space-y-4">
                          <div className="space-y-2">
                            <Label>Link Text</Label>
                            <Input
                              value={link.text}
                              onChange={(e) =>
                                handleUpdateLink(
                                  columnIndex,
                                  linkIndex,
                                  "text",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Link URL</Label>
                            <Input
                              value={link.url}
                              onChange={(e) =>
                                handleUpdateLink(
                                  columnIndex,
                                  linkIndex,
                                  "url",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleRemoveLink(columnIndex, linkIndex)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full" onClick={() => addComponent("footer")}>
            Add Footer
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
