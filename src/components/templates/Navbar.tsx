"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  text: string;
  href: string;
  target: string;
  variant: "default" | "primary" | "secondary";
  dropdownItems?: NavLink[];
}

interface NavbarProps {
  title?: string;
  logoUrl?: string;
  links: NavLink[];
  layout: "default" | "centered" | "split";
  borderRadius: "none" | "small" | "medium" | "large";
}

export function Navbar({
  title,
  logoUrl,
  links,
  layout,
  borderRadius,
}: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (text: string) => {
    setOpenDropdown(openDropdown === text ? null : text);
  };

  const getLinkClasses = (variant: string, hasDropdown: boolean) => {
    const baseClasses =
      "px-3 py-2 rounded-md text-sm font-medium transition-colors";
    const radiusClasses = {
      none: "",
      small: "rounded",
      medium: "rounded-md",
      large: "rounded-lg",
    };
    const variantClasses = {
      default: "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
      primary: "text-white bg-primary hover:bg-primary/90",
      secondary: "text-primary bg-primary/10 hover:bg-primary/20",
    };
    return cn(
      baseClasses,
      radiusClasses[borderRadius],
      variantClasses[variant as keyof typeof variantClasses],
      hasDropdown && "pr-8 relative"
    );
  };

  const renderLinks = () => (
    <>
      {links.map((link) => (
        <div key={link.text} className="relative group">
          {link.dropdownItems ? (
            <button
              onClick={() => toggleDropdown(link.text)}
              className={getLinkClasses(link.variant, true)}
            >
              {link.text}
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4" />
            </button>
          ) : (
            <Link
              href={link.href}
              target={link.target}
              className={getLinkClasses(link.variant, false)}
            >
              {link.text}
            </Link>
          )}
          {link.dropdownItems && openDropdown === link.text && (
            <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {link.dropdownItems.map((item) => (
                  <Link
                    key={item.text}
                    href={item.href}
                    target={item.target}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );

  return (
    <nav className="bg-background shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex h-16",
            layout === "centered" && "justify-center",
            layout === "split" && "justify-between"
          )}
        >
          <div
            className={cn(
              "flex-shrink-0 flex items-center",
              layout === "centered" && "absolute left-4"
            )}
          >
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            ) : (
              <span className="text-xl font-bold">{title}</span>
            )}
          </div>
          <div
            className={cn(
              "flex items-center",
              layout === "default" && "ml-6 space-x-4",
              layout === "centered" && "space-x-4",
              layout === "split" && "space-x-4"
            )}
          >
            {renderLinks()}
          </div>
        </div>
      </div>
    </nav>
  );
}
