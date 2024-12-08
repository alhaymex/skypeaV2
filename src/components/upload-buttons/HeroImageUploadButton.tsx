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

type Props = {
  setHeroState: (prev: any) => void;
};

const HeroImageUploadButton = ({ setHeroState }: Props) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleUplaodComplete = async (res: { url: string }[]) => {
    try {
      setHeroState((prev: any) => ({
        ...prev,
        backgroundImage: res[0].url,
      }));
      toast({
        title: "Success",
        description: "Hero image uploaded successfully!",
      });
      setIsOpen(false); // Close the dialog
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <ImageIcon className="h-4 w-4 mr-2" />
            Upload Hero Image
          </Button>
        </DialogTrigger>
        <DialogContent title="Upload Hero Image">
          <DialogTitle>Upload Image</DialogTitle>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Upload an image for your hero section.
            </p>
            <UploadButton
              endpoint="imageUploader"
              className="ut-label:text-lg ut-button:bg-primary ut-button:text-primary-foreground ut-button:hover:bg-primary/90 ut-readying:bg-primary/70"
              onClientUploadComplete={handleUplaodComplete}
              onUploadError={(error: Error) => {
                console.log(error);
                toast({
                  title: "Error",
                  description: "Something went wrong!",
                  variant: "destructive",
                });
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroImageUploadButton;
