"use client";

import { uploadOpenGraph } from "@/actions/uploads-actions";
import { useToast } from "@/hooks/use-toast";
import { UploadButton } from "@/utils/uploadthing";

export default function OpenGraphUploadButton() {
  const { toast } = useToast();

  return (
    <UploadButton
      endpoint="imageUploader"
      className="ut-label:text-lg ut-button:bg-slate-800 ut-button:ring-primary"
      onClientUploadComplete={(res) => {
        uploadOpenGraph(res[0].url, "skypea-1");

        toast({
          title: "Success",
          description: "OpenGraph image uploaded successfully!",
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
