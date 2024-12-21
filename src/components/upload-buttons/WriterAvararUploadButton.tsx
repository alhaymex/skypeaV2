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
import Image from "next/image";
import { Writer, NewWriterForm } from "@/types/writer";

interface WriterAvatarUploadButtonProps<T extends Writer | NewWriterForm> {
  writer: T;
  setWriter: React.Dispatch<React.SetStateAction<T>>;
  setWriters?: React.Dispatch<React.SetStateAction<Writer[]>>;
}

const WriterAvatarUploadButton = <T extends Writer | NewWriterForm>({
  writer,
  setWriter,
  setWriters,
}: WriterAvatarUploadButtonProps<T>) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleUploadComplete = async (res: { url: string }[]) => {
    try {
      const newAvatarUrl = res[0].url;
      setWriter((prevWriter: T) => ({
        ...prevWriter,
        avatar: newAvatarUrl,
      }));
      if (writer.id && setWriters) {
        setWriters((prevWriters: Writer[]) =>
          prevWriters.map((w: Writer) =>
            w.id === writer.id ? { ...w, avatar: newAvatarUrl } : w
          )
        );
      }
      toast({
        title: "Success",
        description: "Avatar uploaded successfully!",
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
          {writer.avatar ? "Change Avatar" : "Upload Avatar"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Upload Avatar</DialogTitle>
        <div className="space-y-4">
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
          {writer.avatar && (
            <div className="relative w-32 h-32 mx-auto">
              <Image
                src={writer.avatar}
                alt="Writer avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          )}
          <p className="text-sm text-muted-foreground text-center">
            {writer.avatar
              ? "Change the avatar for this writer."
              : "Upload an avatar for the writer."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WriterAvatarUploadButton;
