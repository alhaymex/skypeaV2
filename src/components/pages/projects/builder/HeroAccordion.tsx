import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HeroImageUploadButton from "@/components/upload-buttons/HeroImageUploadButton";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface HeroAccordionProps {
  heroState: any;
  setHeroState: (value: any) => void;
  addComponent: (componentType: string) => void;
}

export function HeroAccordion({
  heroState,
  setHeroState,
  addComponent,
}: HeroAccordionProps) {
  return (
    <AccordionItem value="hero" className="border-amber-200">
      <AccordionTrigger className="text-amber-900 hover:text-amber-700">
        Hero
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          {/* Title Section */}
          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100">
            <Label htmlFor="hero-title" className="text-amber-900">
              Hero Title
            </Label>
            <Input
              id="hero-title"
              value={heroState.title}
              onChange={(e) =>
                setHeroState((prev: any) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="mt-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
              placeholder="Enter hero title"
            />
          </div>

          {/* Subtitle Section */}
          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100">
            <Label htmlFor="hero-subtitle" className="text-amber-900">
              Hero Subtitle
            </Label>
            <Input
              id="hero-subtitle"
              value={heroState.subtitle}
              onChange={(e) =>
                setHeroState((prev: any) => ({
                  ...prev,
                  subtitle: e.target.value,
                }))
              }
              className="mt-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
              placeholder="Enter hero subtitle"
            />
          </div>

          {/* Background Image Section */}
          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100">
            <Label className="text-amber-900">Background Image</Label>
            <div className="space-y-2 mt-2">
              <HeroImageUploadButton
                setHeroState={setHeroState}
                currentImageUrl={heroState.backgroundImage}
              />
              {heroState.backgroundImage ? (
                <div className="relative w-full h-40 rounded-lg overflow-hidden border border-amber-200">
                  <Image
                    src={heroState.backgroundImage}
                    alt="Hero background"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="w-full h-40 rounded-lg border-2 border-dashed border-amber-200 flex items-center justify-center bg-amber-50/30">
                  <div className="text-center text-amber-600">
                    <ImageIcon className="mx-auto h-12 w-12 opacity-50 mb-2" />
                    <p className="text-sm">No image uploaded</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Button Section */}
          <div className="p-4 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg border border-amber-100">
            <div className="space-y-4">
              <div>
                <Label htmlFor="hero-cta-text" className="text-amber-900">
                  CTA Button Text
                </Label>
                <Input
                  id="hero-cta-text"
                  value={heroState.ctaText}
                  onChange={(e) =>
                    setHeroState((prev: any) => ({
                      ...prev,
                      ctaText: e.target.value,
                    }))
                  }
                  className="mt-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                  placeholder="Enter button text"
                />
              </div>
              <div>
                <Label htmlFor="hero-cta-link" className="text-amber-900">
                  CTA Button Link
                </Label>
                <Input
                  id="hero-cta-link"
                  value={heroState.ctaLink}
                  onChange={(e) =>
                    setHeroState((prev: any) => ({
                      ...prev,
                      ctaLink: e.target.value,
                    }))
                  }
                  className="mt-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                  placeholder="Enter button link"
                />
              </div>
            </div>
          </div>

          {/* Add Hero Button */}
          <Button
            onClick={() => addComponent("hero")}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            style={{
              clipPath:
                "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
            }}
          >
            Add Hero
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
