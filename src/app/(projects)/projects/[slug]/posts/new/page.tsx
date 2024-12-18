"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader } from "lucide-react";
import { createPost } from "@/actions/posts-actions";
import { Editor } from "@/components/pages/projects/posts/Editor";
import { blogFormSchema } from "../../../../../../../schema";
import BlogPostImageUploadButton from "@/components/upload-buttons/BlogPostImageUploadButton";

export default function NewPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "<p>Start writing your blog post here...</p>",
      isNewsletter: false,
      image: "https://image.alhaymex.com/placeholder?shape=grid",
    },
  });

  async function onSubmit(values: z.infer<typeof blogFormSchema>) {
    setIsLoading(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "isNewsletter") {
        formData.append(key, value ? "true" : "false");
      } else {
        formData.append(key, value.toString());
      }
    });
    formData.append("blogSlug", slug);

    try {
      const result = await createPost(formData);
      if (!result.success) {
        if (result.errors) {
          Object.entries(result.errors).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
              form.setError(key as keyof z.infer<typeof blogFormSchema>, {
                type: "manual",
                message: value[0],
              });
            }
          });
        } else if (result.message) {
          setServerError(result.message);
        }
      } else {
        router.push("./");
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog post title" {...field} />
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
                        placeholder="Enter a brief description of your post"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <BlogPostImageUploadButton form={form} />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Editor content={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="hidden">
                <FormField
                  control={form.control}
                  name="isNewsletter"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Distribute as Newsletter</FormLabel>
                        <FormDescription>
                          Check this if you want to send this post as a
                          newsletter to your subscribers.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {serverError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{serverError}</AlertDescription>
                </Alert>
              )}

              <Button disabled={isLoading} type="submit">
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" /> Creating...
                  </>
                ) : (
                  "Create Post"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
