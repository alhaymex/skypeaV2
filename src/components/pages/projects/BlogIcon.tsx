import React from "react";
import {
  Pencil,
  BookOpen,
  Lightbulb,
  Star,
  Palette,
  LucideIcon,
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
};

export function BlogIcon({ icon, className }: BlogIconProps) {
  const IconComponent = iconMap[icon];

  return <IconComponent className={className} />;
}
