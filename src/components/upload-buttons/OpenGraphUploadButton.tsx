"use client";
import { uploadOpenGraph } from "@/actions/uploads-actions";
import { useToast } from "@/hooks/use-toast";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Twitter, Linkedin } from "lucide-react";

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
  const [image, setImage] = useState<string>(blogOpenGraph || "/opsengraph");
  const { toast } = useToast();

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
    <div className="flex gap-6">
      <UploadButton
        endpoint="imageUploader"
        className="ut-label:text-lg ut-button:bg-slate-800 ut-button:ring-primary ut-readying:bg-slate-600"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        }}
      />
      {image && (
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
          <div className="text-lg font-medium text-gray-700">
            Social Media Preview
          </div>
          <Card className="w-full overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-[1200/630] w-full">
                <Image
                  src={image}
                  alt="OpenGraph Preview"
                  width={1200}
                  height={630}
                  className="object-cover"
                />
              </div>
              <div className="p-4 bg-white">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {blogName || "Your Website Title"}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {blogDescription ||
                    "Your website description goes here. This is typically a brief summary of your content or website purpose."}
                </p>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span>{blogSlug + ".skypea.net" || "yourwebsite.com"}</span>
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
      )}
    </div>
  );
}
