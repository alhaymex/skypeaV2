"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  backgroundColor: string;
  textColor: string;
}

export function Navbar({
  title,
  logoUrl,
  links,
  layout,
  backgroundColor,
  textColor,
}: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (text: string) => {
    setOpenDropdown(openDropdown === text ? null : text);
  };

  const navbarStyle = {
    backgroundColor,
    color: textColor,
  };

  const linkStyle = {
    color: textColor,
  };

  const renderLinks = () => (
    <>
      {links.map((link) => (
        <div key={link.text} className="relative group">
          {link.dropdownItems ? (
            <Button
              variant="link"
              onClick={() => toggleDropdown(link.text)}
              className="flex items-center"
              style={linkStyle}
            >
              {link.text}
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button asChild variant="link" style={linkStyle}>
              <Link href={link.href} target={link.target}>
                {link.text}
              </Link>
            </Button>
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
                  <Button
                    key={item.text}
                    asChild
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <Link
                      href={item.href}
                      target={item.target}
                      className="block px-4 py-2 text-sm"
                      role="menuitem"
                    >
                      {item.text}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );

  return (
    <nav className="shadow" style={navbarStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex h-16",
            layout === "centered" && "justify-center items-center",
            layout === "split" && "justify-between"
          )}
        >
          <div
            className={cn(
              "flex-shrink-0 flex items-center",
              layout === "centered" &&
                "absolute left-4 top-1/2 transform -translate-y-1/2"
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
