import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import { useToast } from "@/hooks/use-toast";

type Props = {
  setGridState: (prev: any) => void;
  itemId: string;
};

const GridUploadButton = ({ setGridState, itemId }: Props) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleUploadComplete = async (res: { url: string }[]) => {
    try {
      setGridState((prev: any) => ({
        ...prev,
        items: prev.items.map((item: any) =>
          item.id === itemId ? { ...item, imageUrl: res[0].url } : item
        ),
      }));
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
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
          Upload Image
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Upload Image</DialogTitle>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Upload an image for the grid item.
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GridUploadButton;
