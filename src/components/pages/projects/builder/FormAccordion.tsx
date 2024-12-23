import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import { FormField, FormState } from "@/types/components";
import { Slider } from "@/components/ui/slider";

const colorOptions = [
  { label: "White", value: "#ffffff" },
  { label: "Light Gray", value: "#f3f4f6" },
  { label: "Dark Gray", value: "#374151" },
  { label: "Black", value: "#000000" },
  { label: "Primary", value: "#3b82f6" },
  { label: "Secondary", value: "#10b981" },
];

interface FormAccordionProps {
  formState: FormState;
  setFormState: (value: any) => void;
  addComponent: (componentType: string) => void;
}

export function FormAccordion({
  formState,
  setFormState,
  addComponent,
}: FormAccordionProps) {
  const addFormField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      label: `Field ${formState.fields.length + 1}`,
      type: "text",
      placeholder: "",
      required: false,
    };
    setFormState((prev: FormState) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));
  };

  const updateFormField = (id: string, field: string, value: any) => {
    setFormState((prev: FormState) => ({
      ...prev,
      fields: prev.fields.map((f: FormField) =>
        f.id === id ? { ...f, [field]: value } : f
      ),
    }));
  };

  const removeFormField = (id: string) => {
    setFormState((prev: FormState) => ({
      ...prev,
      fields: prev.fields.filter((f: FormField) => f.id !== id),
    }));
  };

  const handleNewsletterToggle = (checked: boolean) => {
    setFormState((prev: FormState) => ({
      ...prev,
      isNewsletter: checked,
      title: checked ? "Subscribe to Our Newsletter" : prev.title,
      description: checked
        ? "Stay updated with our latest news and offers!"
        : prev.description,
      textColor: checked ? "#000000" : prev.textColor,
    }));
  };

  return (
    <AccordionItem value="form">
      <AccordionTrigger>Form</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="newsletter-mode"
              checked={formState.isNewsletter}
              onCheckedChange={handleNewsletterToggle}
            />
            <Label htmlFor="newsletter-mode">Newsletter Mode</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="text-color">Text Color</Label>
            <Select
              value={formState.textColor}
              onValueChange={(value) =>
                setFormState((prev: FormState) => ({
                  ...prev,
                  textColor: value,
                }))
              }
            >
              <SelectTrigger id="text-color">
                <SelectValue placeholder="Select text color" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                      <span>{color.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="form-title">Form Title</Label>
            <Input
              id="form-title"
              value={formState.title}
              onChange={(e) =>
                setFormState((prev: FormState) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Label htmlFor="form-description">Form Description</Label>
            <Input
              id="form-description"
              value={formState.description}
              onChange={(e) =>
                setFormState((prev: FormState) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Label>Form Fields</Label>
            {formState.fields.map((field: FormField) => (
              <div key={field.id} className="space-y-2 mt-2">
                <Input
                  placeholder="Field Label"
                  value={field.label}
                  onChange={(e) =>
                    updateFormField(field.id, "label", e.target.value)
                  }
                />
                <Select
                  value={field.type}
                  onValueChange={(value) =>
                    updateFormField(field.id, "type", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Field Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="textarea">Textarea</SelectItem>
                    <SelectItem value="checkbox">Checkbox</SelectItem>
                  </SelectContent>
                </Select>
                {field.type !== "checkbox" && (
                  <Input
                    placeholder="Placeholder"
                    value={field.placeholder ?? ""}
                    onChange={(e) =>
                      updateFormField(field.id, "placeholder", e.target.value)
                    }
                  />
                )}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`required-${field.id}`}
                    checked={field.required}
                    onCheckedChange={(checked) =>
                      updateFormField(field.id, "required", checked)
                    }
                  />
                  <label
                    htmlFor={`required-${field.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Required
                  </label>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFormField(field.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Remove Field
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addFormField}
              className="mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Field
            </Button>
          </div>
          <div>
            <Label htmlFor="submit-button-text">Submit Button Text</Label>
            <Input
              id="submit-button-text"
              value={formState.submitButtonText}
              onChange={(e) =>
                setFormState((prev: FormState) => ({
                  ...prev,
                  submitButtonText: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="button-text-color">Button Text Color</Label>
            <Select
              value={formState.buttonTextColor}
              onValueChange={(value) =>
                setFormState((prev: FormState) => ({
                  ...prev,
                  buttonTextColor: value,
                }))
              }
            >
              <SelectTrigger id="button-text-color">
                <SelectValue placeholder="Select button text color" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                      <span>{color.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="button-background-color">
              Button Background Color
            </Label>
            <Select
              value={formState.buttonBackgroundColor}
              onValueChange={(value) =>
                setFormState((prev: FormState) => ({
                  ...prev,
                  buttonBackgroundColor: value,
                }))
              }
            >
              <SelectTrigger id="button-background-color">
                <SelectValue placeholder="Select button background color" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                      <span>{color.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="button-border-radius">Button Border Radius</Label>
            <Slider
              id="button-border-radius"
              min={0}
              max={24}
              step={1}
              value={[parseInt(formState.buttonBorderRadius ?? "0")]}
              onValueChange={(value) =>
                setFormState((prev: FormState) => ({
                  ...prev,
                  buttonBorderRadius: value[0].toString(),
                }))
              }
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0px</span>
              <span>4px</span>
              <span>8px</span>
              <span>16px</span>
              <span>24px</span>
            </div>
          </div>
          <Button onClick={() => addComponent("form")} className="w-full">
            Add Form
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
