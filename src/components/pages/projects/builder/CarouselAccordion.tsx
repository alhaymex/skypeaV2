"use client";

import React from "react";
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
import { Plus, Trash2 } from "lucide-react";
import CarouselImageUploadButton from "@/components/upload-buttons/CarouselImageUploadButton";

const DEFAULT_IMAGE_URL =
  "https://image.alhaymex.com/placeholder?width=800&height=400&shape=grid";

interface CarouselAccordionProps {
  carouselState: {
    images: { id: string; src: string; alt: string }[];
    autoplay: boolean;
    interval: number;
    showArrows: boolean;
    showDots: boolean;
  };
  setCarouselState: React.Dispatch<React.SetStateAction<any>>;
  addComponent: (componentType: string) => void;
}

export function CarouselAccordion({
  carouselState,
  setCarouselState,
  addComponent,
}: CarouselAccordionProps) {
  const handleAddImage = () => {
    const newImage = {
      id: Date.now().toString(),
      src: DEFAULT_IMAGE_URL,
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

  return (
    <AccordionItem value="carousel">
      <AccordionTrigger>Carousel</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div className="space-y-4">
            <Label>Images</Label>
            {carouselState.images.map((image) => (
              <div key={image.id} className="flex items-start space-x-4">
                <CarouselImageUploadButton
                  key={`upload-${image.id}`}
                  carouselState={carouselState}
                  setCarouselState={setCarouselState}
                  imageId={image.id}
                />
                <div className="flex-1 space-y-2">
                  <Input
                    key={`input-${image.id}`}
                    value={image.alt}
                    onChange={(e) =>
                      handleImageChange(image.id, "alt", e.target.value)
                    }
                    placeholder="Alt text"
                  />
                  <Button
                    key={`button-${image.id}`}
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveImage(image.id)}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Remove Image
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddImage}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Image
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
      </AccordionContent>
    </AccordionItem>
  );
}
