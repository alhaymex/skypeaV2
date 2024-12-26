"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadOpenGraph } from "@/actions/uploads-actions";
import { useToast } from "@/hooks/use-toast";
import { UploadButton } from "@/utils/uploadthing";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  blogSlug: string;
  blogOpenGraph?: string;
  blogName?: string;
  blogDescription?: string;
};

export default function OpenGraphUploadButton({
  blogSlug,
  blogOpenGraph,
  blogName,
  blogDescription,
}: Props) {
  const [image, setImage] = useState<string>(
    blogOpenGraph || "https://image.alhaymex.com/placeholder?shape=grid"
  );
  const { toast } = useToast();
  console.log(image);

  const handleUploadComplete = async (res: { url: string }[]) => {
    try {
      const result = await uploadOpenGraph(res[0].url, blogSlug);
      setImage(result.url as string);
      toast({
        title: "Success",
        description: "OpenGraph image uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload OpenGraph image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload New Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogTitle>Upload OpenGraph Image</DialogTitle>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Upload a new image to be used as your OpenGraph preview.
                Recommended size: 1200x630 pixels.
              </p>
              <UploadButton
                endpoint="imageUploader"
                className="ut-label:text-lg ut-button:bg-primary ut-button:text-primary-foreground ut-button:hover:bg-primary/90 ut-readying:bg-primary/70"
                onClientUploadComplete={handleUploadComplete}
                onUploadError={(error: Error) => {
                  toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                  });
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="overflow-hidden w-[300px]">
        <CardContent className="p-0">
          <div className="relative aspect-[1200/630] w-full">
            <Image
              src={image}
              alt="OpenGraph Preview"
              width={1200}
              height={630}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
          <div className="p-4 bg-card">
            <h2 className="text-xl font-bold text-card-foreground mb-2">
              {blogName || "Your Website Title"}
            </h2>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {blogDescription ||
                "Your website description goes here. This is typically a brief summary of your content or website purpose."}
            </p>
            <div className="text-xs text-muted-foreground flex items-center justify-between">
              <span>
                {blogSlug ? `${blogSlug}.skypea.net` : "yourwebsite.com"}
              </span>
              <div className="flex gap-2">
                <Facebook className="w-4 h-4" />
                <Twitter className="w-4 h-4" />
                <Linkedin className="w-4 h-4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
