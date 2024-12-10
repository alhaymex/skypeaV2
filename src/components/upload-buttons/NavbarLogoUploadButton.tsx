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
  setNavbarState: (prev: any) => void;
  currentLogoUrl: string;
};

const NavbarLogoUploadButton = ({ setNavbarState, currentLogoUrl }: Props) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState(currentLogoUrl);

  const handleUploadComplete = async (res: { url: string }[]) => {
    try {
      const newLogoUrl = res[0].url;
      setLogoUrl(newLogoUrl);
      setNavbarState((prev: any) => ({
        ...prev,
        logoUrl: newLogoUrl,
      }));
      toast({
        title: "Success",
        description: "Logo uploaded successfully!",
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
          {logoUrl ? "Change Logo" : "Upload Logo"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Upload Logo</DialogTitle>
        <div className={logoUrl ? "space-y-4" : ""}>
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
          {logoUrl && (
            <>
              <div className="relative w-full h-20">
                <Image
                  src={logoUrl}
                  alt="Uploaded logo"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Change the logo for your navbar.
              </p>
            </>
          )}
          {!logoUrl && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              Upload a logo for your navbar.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavbarLogoUploadButton;
