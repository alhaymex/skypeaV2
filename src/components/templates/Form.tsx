import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormField {
  type: string;
  name: string;
  label: string;
}

interface FormProps {
  fields: FormField[];
  submitButton: string;
}

export function Form({ fields, submitButton }: FormProps) {
  return (
    <form className="space-y-4 p-4">
      {fields.map((field, index) => (
        <div key={index}>
          <Label htmlFor={field.name}>{field.label}</Label>
          {field.type === "textarea" ? (
            <Textarea id={field.name} name={field.name} />
          ) : (
            <Input id={field.name} name={field.name} type={field.type} />
          )}
        </div>
      ))}
      <Button type="submit">{submitButton}</Button>
    </form>
  );
}
