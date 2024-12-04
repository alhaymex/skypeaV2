"use client";
import { uploadFavicon } from "@/actions/uploads-actions";
import { useToast } from "@/hooks/use-toast";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";

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
  const [image, setImage] = useState<string>(blogFavicon || "/fd");
  const { toast } = useToast();

  const handleUploadComplete = async (res: { url: string }[]) => {
    try {
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
    <div className="flex items-center gap-6">
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
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col w-80">
            <div className="flex items-center gap-2 bg-[#dee1e6] rounded-t-lg p-2">
              {/* Window control dots */}
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
                  className="mr-2 rounded-full"
                />
                <span className="text-sm text-gray-800 truncate">
                  {blogName || "Your Website"}
                </span>
                <span className="ml-2 text-gray-400 text-xs">×</span>
              </div>
              <div className="flex-grow"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
