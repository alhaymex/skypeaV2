"use client";

import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { blogFormSchema } from "../../../schema";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { Upload } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import { toast, useToast } from "@/hooks/use-toast";

type BlogPostImageUploadButtonProps = {
  form: UseFormReturn<z.infer<typeof blogFormSchema>>;
};

const DEFAULT_IMAGE_URL =
  "https://image.alhaymex.com/placeholder?width=800&height=400&shape=grid";

const BlogPostImageUploadButton = ({
  form,
}: BlogPostImageUploadButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(DEFAULT_IMAGE_URL);
  const { toast } = useToast();

  useEffect(() => {
    const currentImage = form.getValues("image");
    setImageUrl(currentImage || DEFAULT_IMAGE_URL);
  }, [form]);

  const handleUploadComplete = (res: { url: string }[]) => {
    const url = res[0].url;
    setImageUrl(url);
    form.setValue("image", url);
    setIsOpen(false);
  };

  if (!imageUrl) return null;

  return (
    <div>
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input type="hidden" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-32 h-32 p-0 relative overflow-hidden"
          >
            <Image
              src={imageUrl}
              alt="Blog post image"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Upload className="h-6 w-6 text-white" />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Upload Image</DialogTitle>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              {imageUrl === DEFAULT_IMAGE_URL
                ? "Upload an image to replace the default placeholder."
                : "Upload a new image for the blog post."}
            </p>
            <UploadButton
              endpoint="imageUploader"
              className="ut-label:text-lg ut-button:bg-primary ut-button:text-primary-foreground ut-button:hover:bg-primary/90 ut-readying:bg-primary/70"
              onClientUploadComplete={handleUploadComplete}
              onUploadError={(error: Error) => {
                console.log(error);
                toast({
                  title: "Error",
                  description: "Something went wrong!",
                  variant: "destructive",
                });
              }}
            />
            {imageUrl && (
              <div className="relative w-full h-40">
                <Image
                  src={imageUrl}
                  alt="Blog post preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogPostImageUploadButton;
