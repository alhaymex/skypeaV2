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
    <AccordionItem value="hero">
      <AccordionTrigger>Hero</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="hero-title">Hero Title</Label>
            <Input
              id="hero-title"
              value={heroState.title}
              onChange={(e) =>
                setHeroState((prev: any) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
            <Input
              id="hero-subtitle"
              value={heroState.subtitle}
              onChange={(e) =>
                setHeroState((prev: any) => ({
                  ...prev,
                  subtitle: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Label htmlFor="hero-background">Background Image URL</Label>
            <div className="flex space-x-2">
              {/* <Input
                id="hero-background"
                value={heroState.backgroundImage}
                onChange={(e) =>
                  setHeroState((prev: any) => ({
                    ...prev,
                    backgroundImage: e.target.value,
                  }))
                }
              /> */}
              <HeroImageUploadButton setHeroState={setHeroState} />
            </div>
          </div>
          <div>
            <Label htmlFor="hero-cta-text">CTA Button Text</Label>
            <Input
              id="hero-cta-text"
              value={heroState.ctaText}
              onChange={(e) =>
                setHeroState((prev: any) => ({
                  ...prev,
                  ctaText: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Label htmlFor="hero-cta-link">CTA Button Link</Label>
            <Input
              id="hero-cta-link"
              value={heroState.ctaLink}
              onChange={(e) =>
                setHeroState((prev: any) => ({
                  ...prev,
                  ctaLink: e.target.value,
                }))
              }
            />
          </div>
          <Button onClick={() => addComponent("hero")} className="w-full">
            Add Hero
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
