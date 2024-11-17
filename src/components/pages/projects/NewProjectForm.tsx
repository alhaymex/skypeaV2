"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Camera,
  Code,
  Coffee,
  Film,
  Gamepad,
  Globe,
  Heart,
  Lightbulb,
  Loader2,
  Music,
  Palette,
  Pencil,
  Plane,
  Star,
  Utensils,
} from "lucide-react";

const blogIcons = [
  { value: "pencil", label: "Pencil", icon: Pencil },
  { value: "book", label: "Books", icon: BookOpen },
  { value: "lightbulb", label: "Lightbulb", icon: Lightbulb },
  { value: "star", label: "Star", icon: Star },
  { value: "palette", label: "Paint Palette", icon: Palette },
  { value: "coffee", label: "Coffee", icon: Coffee },
  { value: "camera", label: "Camera", icon: Camera },
  { value: "music", label: "Music", icon: Music },
  { value: "code", label: "Code", icon: Code },
  { value: "globe", label: "Globe", icon: Globe },
  { value: "heart", label: "Heart", icon: Heart },
  { value: "utensils", label: "Utensils", icon: Utensils },
  { value: "plane", label: "Plane", icon: Plane },
  { value: "gamepad", label: "Gamepad", icon: Gamepad },
  { value: "film", label: "Film", icon: Film },
];

const blogCategories = [
  "Technology",
  "Lifestyle",
  "Travel",
  "Food",
  "Fashion",
  "Health",
  "Business",
  "Education",
  "Art",
  "Entertainment",
];

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Blog name must be at least 3 characters.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(300, {
      message: "Description must not exceed 300 characters.",
    }),
  icon: z.string({
    required_error: "Please select a blog icon.",
  }),
  category: z.string({
    required_error: "Please select a blog category.",
  }),
  initialPostTitle: z.string().min(3, {
    message: "Initial post title must be at least 3 characters.",
  }),
});

export default function NewBlogForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [slug, setSlug] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "",
      category: "",
      initialPostTitle: "",
    },
  });

  const watchName = form.watch("name");

  useEffect(() => {
    const newSlug = watchName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(newSlug);
  }, [watchName]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Here you would typically send a request to your API to create the blog
      // For now, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log({ ...values, slug });

      router.push(`/blog/${slug}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Name</FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Blog" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief description of your blog..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Icon</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {blogIcons.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      <div className="flex items-center">
                        <icon.icon className="mr-2 h-4 w-4" />
                        <span>{icon.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {blogCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="initialPostTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Post Title</FormLabel>
              <FormControl>
                <Input placeholder="Welcome to My Blog!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Blog URL</FormLabel>
          <div className="flex items-center space-x-2">
            <Input value={slug} readOnly className="w-[200px]" />
            <span className="text-sm text-muted-foreground">.skypea.net</span>
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Blog"
          )}
        </Button>
      </form>
    </Form>
  );
}
