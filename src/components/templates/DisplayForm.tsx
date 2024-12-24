"use client";

import React, { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { submitFormMessage } from "@/actions/form-actions";
import { useToast } from "@/hooks/use-toast";

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
  const [formData, setFormData] = useState<
    Record<string, { value: string | boolean; label: string }>
  >({});
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const field = fields.find((f) => f.id === id);
    setFormData((prev) => ({
      ...prev,
      [id]: { value, label: field?.label || "" },
    }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    const field = fields.find((f) => f.id === id);
    setFormData((prev) => ({
      ...prev,
      [id]: { value: checked, label: field?.label || "" },
    }));
  };

  const clearForm = () => {
    setFormData({});
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitFormMessage(slug, formData);
      clearForm();
      toast({
        title: "Message submitted",
        description: "Your message has been submitted successfully",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
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
                value={(formData.email?.value as string) || ""}
                disabled={isSubmitting}
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
                    value={(formData[field.id]?.value as string) || ""}
                    disabled={isSubmitting}
                  />
                ) : field.type === "checkbox" ? (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={field.id}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(field.id, checked as boolean)
                      }
                      checked={(formData[field.id]?.value as boolean) || false}
                      disabled={isSubmitting}
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
                    value={(formData[field.id]?.value as string) || ""}
                    disabled={isSubmitting}
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
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              submitButtonText
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
