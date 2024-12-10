import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ImageIcon } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

type Props = {
  setHeroState: (prev: any) => void;
  currentImageUrl: string;
};

const HeroImageUploadButton = ({ setHeroState, currentImageUrl }: Props) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(currentImageUrl);

  const handleUploadComplete = async (res: { url: string }[]) => {
    try {
      const newImageUrl = res[0].url;
      setImageUrl(newImageUrl);
      setHeroState((prev: any) => ({
        ...prev,
        backgroundImage: newImageUrl,
      }));
      toast({
        title: "Success",
        description: "Hero image uploaded successfully!",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <ImageIcon className="h-4 w-4 mr-2" />
          {imageUrl ? "Change Hero Image" : "Upload Hero Image"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Upload Hero Image</DialogTitle>
        <div className={imageUrl ? "space-y-4" : ""}>
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
            <>
              <div className="relative w-full h-40">
                <Image
                  src={imageUrl}
                  alt="Uploaded hero image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Change the hero image.
              </p>
            </>
          )}
          {!imageUrl && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              Upload an image for your hero section.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HeroImageUploadButton;
