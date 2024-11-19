import React from "react";
import {
  Pencil,
  BookOpen,
  Lightbulb,
  Star,
  Palette,
  LucideIcon,
  Coffee,
  Camera,
  Music,
  Code,
  Globe,
  Heart,
  Utensils,
  Plane,
  Gamepad,
  Film,
} from "lucide-react";

interface BlogIconProps {
  icon: string;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  pencil: Pencil,
  book: BookOpen,
  lightbulb: Lightbulb,
  star: Star,
  palette: Palette,
  coffee: Coffee,
  camera: Camera,
  music: Music,
  code: Code,
  globe: Globe,
  heart: Heart,
  utensils: Utensils,
  plane: Plane,
  gamepad: Gamepad,
  film: Film,
};

export function BlogIcon({ icon, className }: BlogIconProps) {
  const IconComponent = iconMap[icon];

  return <IconComponent className={className} />;
}
