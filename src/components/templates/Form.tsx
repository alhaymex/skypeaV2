import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "textarea" | "checkbox";
  placeholder?: string;
  required?: boolean;
}

interface FormProps {
  title: string;
  description: string;
  fields: FormField[];
  submitButtonText: string;
}

export function Form({
  title,
  description,
  fields,
  submitButtonText,
}: FormProps) {
  return (
    <div className="w-full max-w-md mx-auto py-12">
      <div className="space-y-4">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <form className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ) : field.type === "checkbox" ? (
                <div className="flex items-center space-x-2">
                  <Checkbox id={field.id} />
                  <label
                    htmlFor={field.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {field.label}
                  </label>
                </div>
              ) : (
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              )}
            </div>
          ))}
          <Button type="submit" className="w-full">
            {submitButtonText}
          </Button>
        </form>
      </div>
    </div>
  );
}
