import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PageCustomizationAccordionProps {
  pageState: {
    backgroundColor: string;
    fontFamily: string;
  };
  setPageState: (value: {
    backgroundColor: string;
    fontFamily: string;
  }) => void;
}

const presetColors = [
  { name: "White", value: "#ffffff" },
  { name: "Light Gray", value: "#f3f4f6" },
  { name: "Dark Gray", value: "#1f2937" },
  { name: "Black", value: "#000000" },
  { name: "Primary", value: "#3b82f6" },
  { name: "Secondary", value: "#10b981" },
  { name: "Accent", value: "#8b5cf6" },
];

const fontOptions = [
  { name: "Sans Serif", value: "sans-serif" },
  { name: "Serif", value: "serif" },
  { name: "Monospace", value: "monospace" },
];

export function PageCustomizationAccordion({
  pageState,
  setPageState,
}: PageCustomizationAccordionProps) {
  const handleBackgroundColorChange = (value: string) => {
    setPageState({ ...pageState, backgroundColor: value });
  };

  const handleFontFamilyChange = (value: string) => {
    setPageState({ ...pageState, fontFamily: value });
  };

  return (
    <AccordionItem value="page-customization">
      <AccordionTrigger>Page Customization</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div>
            <Label>Background Color</Label>
            <Select
              value={pageState.backgroundColor}
              onValueChange={handleBackgroundColorChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {presetColors.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Font Family</Label>
            <Select
              value={pageState.fontFamily}
              onValueChange={handleFontFamilyChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
