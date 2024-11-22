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
import { Plus, Trash2 } from "lucide-react";

interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "textarea" | "checkbox";
  placeholder?: string;
  required?: boolean;
}

interface FormAccordionProps {
  formState: {
    title: string;
    description: string;
    fields: FormField[];
    submitButtonText: string;
  };
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
    setFormState((prev: any) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));
  };

  const updateFormField = (id: string, field: string, value: any) => {
    setFormState((prev: any) => ({
      ...prev,
      fields: prev.fields.map((f: FormField) =>
        f.id === id ? { ...f, [field]: value } : f
      ),
    }));
  };

  const removeFormField = (id: string) => {
    setFormState((prev: any) => ({
      ...prev,
      fields: prev.fields.filter((f: FormField) => f.id !== id),
    }));
  };

  return (
    <AccordionItem value="form">
      <AccordionTrigger>Form</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="form-title">Form Title</Label>
            <Input
              id="form-title"
              value={formState.title}
              onChange={(e) =>
                setFormState((prev: any) => ({
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
                setFormState((prev: any) => ({
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
                    value={field.placeholder}
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
                setFormState((prev: any) => ({
                  ...prev,
                  submitButtonText: e.target.value,
                }))
              }
            />
          </div>
          <Button onClick={() => addComponent("form")} className="w-full">
            Add Form
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
