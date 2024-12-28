import React from "react";
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
  isNewsletter: boolean;
  textColor?: string;
  buttonTextColor?: string;
  buttonBackgroundColor?: string;
  buttonBorderRadius?: string;
}

export function Form({
  title,
  description,
  fields,
  submitButtonText,
  isNewsletter,
  textColor = "#4A3500",
  buttonTextColor = "#FFFFFF",
  buttonBackgroundColor = "#FFA000",
  buttonBorderRadius = "0",
}: FormProps) {
  return (
    <div className="w-full max-w-md mx-auto py-12 relative">
      {/* Hexagonal background pattern - purely decorative */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-16 h-16 bg-amber-200 rotate-45" />
        <div className="absolute top-12 right-4 w-12 h-12 bg-amber-300 rotate-45" />
        <div className="absolute bottom-8 left-8 w-14 h-14 bg-amber-100 rotate-45" />
      </div>

      <div className="relative space-y-6 bg-gradient-to-b from-amber-50 to-white p-8 rounded-lg shadow-lg border border-amber-200">
        {/* Header section with honeycomb accent */}
        <div className="space-y-3 text-center relative">
          <div
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-amber-400 opacity-20"
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          />
          <h2 className="text-3xl font-bold pt-4" style={{ color: textColor }}>
            {title}
          </h2>
          <p className="text-amber-700">{description}</p>
        </div>

        <form className="space-y-5">
          {isNewsletter ? (
            <div className="space-y-2">
              <Label htmlFor="email" className="text-amber-900">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
              />
            </div>
          ) : (
            fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="text-amber-900">
                  {field.label}
                </Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                  />
                ) : field.type === "checkbox" ? (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={field.id}
                      className="text-amber-600 focus:ring-amber-400"
                    />
                    <label
                      htmlFor={field.id}
                      className="text-sm font-medium leading-none text-amber-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                  />
                )}
              </div>
            ))
          )}

          <Button
            type="submit"
            className="w-full hover:bg-amber-600 transition-colors duration-200"
            style={{
              color: buttonTextColor,
              backgroundColor: buttonBackgroundColor,
              clipPath:
                "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
              padding: "1.5rem",
            }}
          >
            {submitButtonText}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Form;
