import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon, Upload } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

type Props = {
  carouselState: {
    images: { id: string; src: string; alt: string }[];
  };
  setCarouselState: React.Dispatch<React.SetStateAction<any>>;
  imageId: string;
};

const CarouselImageUploadButton = ({
  setCarouselState,
  carouselState,
  imageId,
}: Props) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const currentImage = carouselState.images.find((img) => img.id === imageId);

  const handleUploadComplete = async (res: { url: string }[]) => {
    try {
      setCarouselState((prevState: any) => ({
        ...prevState,
        images: prevState.images.map(
          (image: { id: string; src: string; alt: string }) =>
            image.id === imageId ? { ...image, src: res[0].url } : image
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
        <Button
          variant="outline"
          className="w-32 h-32 p-0 relative overflow-hidden"
        >
          {currentImage && currentImage.src !== "" ? (
            <>
              <Image
                src={currentImage.src}
                alt={currentImage.alt || "Uploaded image"}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Upload className="h-6 w-6 text-white" />
              </div>
            </>
          ) : (
            <ImageIcon className="h-6 w-6" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Upload Image</DialogTitle>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Upload an image for the carousel.
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

export default CarouselImageUploadButton;
