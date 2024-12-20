"use client";
import { useState } from "react";
import Image from "next/image";
import { uploadFavicon } from "@/actions/uploads-actions";
import { useToast } from "@/hooks/use-toast";
import { UploadButton } from "@/utils/uploadthing";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isIcoFile } from "@/utils/utils";

type Props = {
  blogSlug: string;
  blogFavicon?: string;
  blogName?: string;
};

export default function FaviconUploadButton({
  blogSlug,
  blogFavicon,
  blogName,
}: Props) {
  const [image, setImage] = useState<string>(
    blogFavicon || "https://image.alhaymex.com/placeholder?width=64&height=64"
  );
  const { toast } = useToast();

  const handleUploadComplete = async (res: { url: string }[]) => {
    try {
      const isIco = await isIcoFile(res[0].url);

      if (!isIco) {
        toast({
          title: "Invalid File Format",
          description: "Please upload a valid ICO file format for the favicon",
          variant: "destructive",
        });
        return;
      }

      const result = await uploadFavicon(res[0].url, blogSlug);
      setImage(result.url as string);
      toast({
        title: "Success",
        description: "Favicon uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload favicon",
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
              Upload New Favicon
            </Button>
          </DialogTrigger>
          <DialogContent title="Upload Favicon">
            <DialogTitle>Upload favicon ico</DialogTitle>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Upload a new favicon for your blog. Recommended size: 32x32
                pixels. Supported formats: ICO only
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
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-2 bg-[#dee1e6] rounded-t-lg p-2">
              {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
                <div
                  key={color}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            <div className="flex bg-[#f3f3f3]">
              <div className="flex items-center bg-white rounded-t-lg px-4 py-2 max-w-[240px]">
                <Image
                  src={image}
                  alt="Favicon Preview"
                  width={16}
                  height={16}
                  className="mr-2 rounded-sm"
                />
                <span className="text-sm text-gray-800 truncate">
                  {blogName || "Your Website"}
                </span>
                <span className="ml-2 text-gray-400 text-xs">×</span>
              </div>
              <div className="flex-grow"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
