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
import { colorOptions } from "@/utils/colors";

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
    <AccordionItem value="page-customization" className="border-amber-200">
      <AccordionTrigger className="text-amber-900 hover:text-amber-700">
        Page Customization
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          {/* Background Color Section */}
          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100">
            <Label className="text-amber-900 mb-2 block">
              Background Color
            </Label>
            <Select
              value={pageState.backgroundColor}
              onValueChange={handleBackgroundColorChange}
            >
              <SelectTrigger className="border-amber-200 focus:ring-amber-400">
                <SelectValue placeholder="Select color">
                  <div className="flex items-center">
                    {pageState.backgroundColor && (
                      <>
                        <div
                          className="w-4 h-4 rounded-full mr-2 border border-amber-200"
                          style={{ backgroundColor: pageState.backgroundColor }}
                        />
                        {
                          colorOptions.find(
                            (c) => c.value === pageState.backgroundColor
                          )?.label
                        }
                      </>
                    )}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white border-amber-200">
                {colorOptions.map((color) => (
                  <SelectItem
                    key={color.value}
                    value={color.value}
                    className="hover:bg-amber-50"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-2 border border-amber-200"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-amber-900">{color.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Family Section */}
          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100">
            <Label className="text-amber-900 mb-2 block">Font Family</Label>
            <Select
              value={pageState.fontFamily}
              onValueChange={handleFontFamilyChange}
            >
              <SelectTrigger className="border-amber-200 focus:ring-amber-400">
                <SelectValue placeholder="Select font">
                  {pageState.fontFamily && (
                    <span style={{ fontFamily: pageState.fontFamily }}>
                      {
                        fontOptions.find(
                          (f) => f.value === pageState.fontFamily
                        )?.name
                      }
                    </span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white border-amber-200">
                {fontOptions.map((font) => (
                  <SelectItem
                    key={font.value}
                    value={font.value}
                    className="hover:bg-amber-50"
                  >
                    <span
                      className="text-amber-900"
                      style={{ fontFamily: font.value }}
                    >
                      {font.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Font Preview */}
            {pageState.fontFamily && (
              <div className="mt-4 p-3 bg-white/50 rounded-lg border border-amber-200">
                <p
                  className="text-amber-900"
                  style={{ fontFamily: pageState.fontFamily }}
                >
                  Font Preview: The quick brown fox jumps over the lazy dog
                </p>
              </div>
            )}
          </div>

          {/* Color Preview */}
          {pageState.backgroundColor && (
            <div className="mt-4 overflow-hidden rounded-lg border border-amber-200">
              <div
                className="p-4 text-center text-sm"
                style={{ backgroundColor: pageState.backgroundColor }}
              >
                Background Color Preview
              </div>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
