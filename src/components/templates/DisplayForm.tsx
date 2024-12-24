"use client";

import React, { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { submitFormMessage } from "@/actions/display-actions";

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
  textColor: string;
  buttonTextColor: string;
  buttonBackgroundColor: string;
  buttonBorderRadius: string;
  slug: string;
}

export function DisplayForm({
  title,
  description,
  fields,
  submitButtonText,
  isNewsletter,
  textColor,
  buttonTextColor,
  buttonBackgroundColor,
  buttonBorderRadius,
  slug,
}: FormProps) {
  const [formData, setFormData] = useState<Record<string, string | boolean>>(
    {}
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitFormMessage(slug, formData);
    console.log("Form Data:", formData);
  };

  return (
    <div className="w-full max-w-md mx-auto py-12" style={{ color: textColor }}>
      <div className="space-y-4">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isNewsletter ? (
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                onChange={handleInputChange}
                value={(formData.email as string) || ""}
              />
            </div>
          ) : (
            fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={handleInputChange}
                    value={(formData[field.id] as string) || ""}
                  />
                ) : field.type === "checkbox" ? (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={field.id}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(field.id, checked as boolean)
                      }
                      checked={(formData[field.id] as boolean) || false}
                    />
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
                    onChange={handleInputChange}
                    value={(formData[field.id] as string) || ""}
                  />
                )}
              </div>
            ))
          )}
          <Button
            type="submit"
            className="w-full"
            style={{
              color: buttonTextColor,
              backgroundColor: buttonBackgroundColor,
              borderRadius: `${parseInt(buttonBorderRadius) * 4}px`,
            }}
          >
            {submitButtonText}
          </Button>
        </form>
      </div>
    </div>
  );
}
