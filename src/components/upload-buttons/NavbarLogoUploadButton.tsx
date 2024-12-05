import React from "react";
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
  setNavbarState: (prev: any) => void;
};

const NavbarLogoUploadButton = ({ setNavbarState }: Props) => {
  const { toast } = useToast();

  const handleUplaodComplete = async (res: { url: string }[]) => {
    try {
      setNavbarState((prev: any) => ({
        ...prev,
        logoUrl: res[0].url,
      }));
      toast({
        title: "Success",
        description: "Logo uploaded successfully!",
      });
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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <ImageIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent title="Upload Favicon">
          <DialogTitle>Upload Logo</DialogTitle>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Upload a logo for your blog.
            </p>
            <UploadButton
              endpoint="imageUploader"
              className="ut-label:text-lg ut-button:bg-primary ut-button:text-primary-foreground ut-button:hover:bg-primary/90 ut-readying:bg-primary/70"
              onClientUploadComplete={handleUplaodComplete}
              onUploadError={(error: Error) => {
                console.log(error);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NavbarLogoUploadButton;
