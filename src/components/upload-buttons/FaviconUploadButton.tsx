"use client";

import { uploadFavicon } from "@/actions/uploads-actions";
import { useToast } from "@/hooks/use-toast";
import { UploadButton } from "@/utils/uploadthing";

export default function FaviconUploadButton() {
  const { toast } = useToast();

  return (
    <UploadButton
      endpoint="imageUploader"
      className="ut-label:text-lg ut-button:bg-slate-800 ut-button:ring-primary ut-readying:bg-slate-600"
      onClientUploadComplete={(res) => {
        uploadFavicon(res[0].url, "skypea-1");

        toast({
          title: "Success",
          description: "Favicon uploaded successfully!",
        });
      }}
      onUploadError={(error: Error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }}
    />
  );
}
