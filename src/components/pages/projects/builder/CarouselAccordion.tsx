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
import { CarouselState } from "@/types/components";

const DEFAULT_IMAGE_URL =
  "https://image.alhaymex.com/placeholder?width=800&height=400&shape=grid";

interface CarouselAccordionProps {
  carouselState: CarouselState;
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
    <AccordionItem value="carousel" className="border-amber-200">
      <AccordionTrigger className="text-amber-900 hover:text-amber-700">
        Carousel
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          {/* Images Section */}
          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100">
            <Label className="text-amber-900 mb-4 block">Images</Label>
            <div className="space-y-4">
              {carouselState.images.map((image) => (
                <div
                  key={image.id}
                  className="p-4 border border-amber-200 rounded-lg bg-white/50 space-y-4"
                >
                  <div className="flex items-start space-x-4">
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
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                      <Button
                        key={`button-${image.id}`}
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveImage(image.id)}
                        className="w-full bg-red-500 hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Remove Image
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddImage}
                className="w-full border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>

          {/* Settings Section */}
          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100 space-y-4">
            <Label className="text-amber-900 block">Carousel Settings</Label>

            {/* Autoplay Toggle */}
            <div className="flex items-center justify-between p-2 rounded-md hover:bg-amber-50/50">
              <div className="flex items-center space-x-2">
                <Switch
                  id="autoplay"
                  checked={carouselState.autoplay}
                  onCheckedChange={(checked) =>
                    handleSettingChange("autoplay", checked)
                  }
                  className="data-[state=checked]:bg-amber-500"
                />
                <Label htmlFor="autoplay" className="text-amber-700">
                  Autoplay
                </Label>
              </div>
            </div>

            {/* Interval Slider */}
            {carouselState.autoplay && (
              <div className="space-y-2 p-2 rounded-md bg-amber-50/30">
                <Label htmlFor="interval" className="text-amber-900">
                  Interval (seconds)
                </Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="interval"
                    min={1}
                    max={10}
                    step={1}
                    value={[carouselState.interval]}
                    onValueChange={(value) =>
                      handleSettingChange("interval", value[0])
                    }
                    className="flex-1"
                  />
                  <span className="text-sm text-amber-700 font-medium w-16">
                    {carouselState.interval}s
                  </span>
                </div>
              </div>
            )}

            {/* Navigation Arrows Toggle */}
            <div className="flex items-center justify-between p-2 rounded-md hover:bg-amber-50/50">
              <div className="flex items-center space-x-2">
                <Switch
                  id="showArrows"
                  checked={carouselState.showArrows}
                  onCheckedChange={(checked) =>
                    handleSettingChange("showArrows", checked)
                  }
                  className="data-[state=checked]:bg-amber-500"
                />
                <Label htmlFor="showArrows" className="text-amber-700">
                  Show Navigation Arrows
                </Label>
              </div>
            </div>

            {/* Navigation Dots Toggle */}
            <div className="flex items-center justify-between p-2 rounded-md hover:bg-amber-50/50">
              <div className="flex items-center space-x-2">
                <Switch
                  id="showDots"
                  checked={carouselState.showDots}
                  onCheckedChange={(checked) =>
                    handleSettingChange("showDots", checked)
                  }
                  className="data-[state=checked]:bg-amber-500"
                />
                <Label htmlFor="showDots" className="text-amber-700">
                  Show Navigation Dots
                </Label>
              </div>
            </div>
          </div>

          {/* Add Carousel Button */}
          <Button
            onClick={() => addComponent("carousel")}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            style={{
              clipPath:
                "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
            }}
          >
            Add Carousel
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
