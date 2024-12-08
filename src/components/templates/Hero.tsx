import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
}

export function Hero({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaLink,
}: HeroProps) {
  return (
    <div className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
      <Image
        src={backgroundImage}
        alt="Hero background"
        width={1920}
        height={1080}
        style={{ objectFit: "cover" }}
        className="absolute inset-0 z-0"
        unoptimized
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 max-w-3xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8">{subtitle}</p>
        <Button asChild size="lg">
          <a href={ctaLink}>{ctaText}</a>
        </Button>
      </div>
    </div>
  );
}
