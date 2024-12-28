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
      {/* Background image */}
      <Image
        src={backgroundImage}
        alt="Hero background"
        width={1920}
        height={1080}
        style={{ objectFit: "cover" }}
        className="absolute inset-0 z-0"
        unoptimized
      />

      {/* Overlay with honeycomb pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/80 to-amber-950/90 z-10">
        {/* Decorative honeycomb pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <pattern
            id="honeycomb"
            x="0"
            y="0"
            width="20"
            height="34.64"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(0.5)"
          >
            <path
              d="M0,17.32l10,17.32l10,-17.32l-10,-17.32z M20,17.32l10,17.32l10,-17.32l-10,-17.32z M10,34.64l10,17.32l10,-17.32l-10,-17.32z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
          <rect x="0" y="0" width="100" height="100" fill="url(#honeycomb)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-3xl px-4 animate-fade-in">
        {/* Decorative hexagons */}
        <div className="absolute -top-8 -left-8 w-16 h-16 bg-amber-400/20 rotate-45 blur-sm" />
        <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-amber-400/20 rotate-45 blur-sm" />

        <h1 className="text-4xl md:text-6xl font-bold text-amber-50 mb-4 relative">
          {/* Decorative line */}
          <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-amber-400" />
          {title}
        </h1>

        <p className="text-xl md:text-2xl text-amber-200 mb-12">{subtitle}</p>

        <Button
          asChild
          size="lg"
          className="bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300 group relative overflow-hidden"
          style={{
            clipPath:
              "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
          }}
        >
          <a href={ctaLink} className="px-8 py-6">
            {/* Hover effect */}
            <span className="absolute inset-0 w-full h-full bg-amber-400/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative">{ctaText}</span>
          </a>
        </Button>
      </div>
    </div>
  );
}

// Add these styles to your global CSS
const styles = `
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}
`;

export default Hero;
