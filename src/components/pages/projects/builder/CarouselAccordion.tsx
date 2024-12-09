"use client";

import React, { useState } from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash2, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CarouselAccordionProps {
  carouselState: {
    images: { id: string; src: string; alt: string }[];
    autoplay: boolean;
    interval: number;
    showArrows: boolean;
    showDots: boolean;
  };
  setCarouselState: (value: any) => void;
  addComponent: (componentType: string) => void;
}

export function CarouselAccordion({
  carouselState,
  setCarouselState,
  addComponent,
}: CarouselAccordionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImageId, setCurrentImageId] = useState<string | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState("");

  const handleAddImage = () => {
    const newImage = {
      id: Date.now().toString(),
      src: "https://image.alhaymex.com/placeholder?height=200&width=200",
      alt: `Image ${carouselState.images.length + 1}`,
    };
    setCarouselState({
      ...carouselState,
      images: [...carouselState.images, newImage],
    });
  };

  const handleRemoveImage = (id: string) => {
    setCarouselState({
      ...carouselState,
      images: carouselState.images.filter((image) => image.id !== id),
    });
  };

  const handleImageChange = (
    id: string,
    field: "src" | "alt",
    value: string
  ) => {
    setCarouselState({
      ...carouselState,
      images: carouselState.images.map((image) =>
        image.id === id ? { ...image, [field]: value } : image
      ),
    });
  };

  const handleSettingChange = (
    setting: keyof typeof carouselState,
    value: boolean | number
  ) => {
    setCarouselState({
      ...carouselState,
      [setting]: value,
    });
  };

  const handleOpenDialog = (id: string) => {
    setCurrentImageId(id);
    const image = carouselState.images.find((img) => img.id === id);
    if (image) {
      setTempImageUrl(image.src);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentImageId(null);
    setTempImageUrl("");
  };

  const handleImageUpload = () => {
    if (currentImageId) {
      handleImageChange(currentImageId, "src", tempImageUrl);
      handleCloseDialog();
    }
  };

  return (
    <AccordionItem value="carousel">
      <AccordionTrigger>Carousel</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Images</Label>
            {carouselState.images.map((image) => (
              <div key={image.id} className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleOpenDialog(image.id)}
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload Image
                </Button>
                <Input
                  value={image.alt}
                  onChange={(e) =>
                    handleImageChange(image.id, "alt", e.target.value)
                  }
                  placeholder="Alt text"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveImage(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={handleAddImage}>
              <Plus className="mr-2 h-4 w-4" /> Add Image
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="autoplay"
              checked={carouselState.autoplay}
              onCheckedChange={(checked) =>
                handleSettingChange("autoplay", checked)
              }
            />
            <Label htmlFor="autoplay">Autoplay</Label>
          </div>

          {carouselState.autoplay && (
            <div className="space-y-2">
              <Label htmlFor="interval">Interval (seconds)</Label>
              <Slider
                id="interval"
                min={1}
                max={10}
                step={1}
                value={[carouselState.interval]}
                onValueChange={(value) =>
                  handleSettingChange("interval", value[0])
                }
              />
              <div className="text-sm text-muted-foreground">
                {carouselState.interval} seconds
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              id="showArrows"
              checked={carouselState.showArrows}
              onCheckedChange={(checked) =>
                handleSettingChange("showArrows", checked)
              }
            />
            <Label htmlFor="showArrows">Show Navigation Arrows</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="showDots"
              checked={carouselState.showDots}
              onCheckedChange={(checked) =>
                handleSettingChange("showDots", checked)
              }
            />
            <Label htmlFor="showDots">Show Navigation Dots</Label>
          </div>

          <Button className="w-full" onClick={() => addComponent("carousel")}>
            Add Carousel
          </Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={tempImageUrl}
                onChange={(e) => setTempImageUrl(e.target.value)}
                placeholder="Enter image URL"
              />
              <Button onClick={handleImageUpload}>Confirm Upload</Button>
            </div>
          </DialogContent>
        </Dialog>
      </AccordionContent>
    </AccordionItem>
  );
}
