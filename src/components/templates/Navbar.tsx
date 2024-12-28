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
  backgroundColor?: string;
  textColor?: string;
}

export function Navbar({
  title,
  logoUrl,
  links,
  layout,
  backgroundColor = "white",
  textColor = "#4A3500",
}: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (text: string) => {
    setOpenDropdown(openDropdown === text ? null : text);
  };

  const renderLinks = () => (
    <>
      {links.map((link) => (
        <div key={link.text} className={cn("relative group")}>
          {link.dropdownItems ? (
            <Button
              variant="ghost"
              onClick={() => toggleDropdown(link.text)}
              className="flex items-center hover:bg-amber-50 transition-colors relative"
              style={{ color: textColor }}
            >
              {link.text}
              <ChevronDown
                className={cn(
                  "ml-1 h-4 w-4 transition-transform duration-200",
                  openDropdown === link.text && "rotate-180"
                )}
              />
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: textColor }}
              />
            </Button>
          ) : (
            <Button
              asChild
              variant="ghost"
              className="hover:bg-amber-50 transition-colors relative group"
              style={{ color: textColor }}
            >
              <Link href={link.href} target={link.target}>
                {link.text}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: textColor }}
                />
              </Link>
            </Button>
          )}
          {link.dropdownItems && openDropdown === link.text && (
            <div className="absolute z-10 left-0 mt-2 w-48 rounded-lg shadow-lg bg-white border border-amber-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 to-transparent pointer-events-none" />
              <div
                className="py-1 relative"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {link.dropdownItems.map((item) => (
                  <Button
                    key={item.text}
                    asChild
                    variant="ghost"
                    className="w-full justify-start hover:bg-amber-50 transition-colors"
                    style={{ color: textColor }}
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
    <nav className="relative shadow-md" style={{ backgroundColor }}>
      {/* Honeycomb pattern background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='40' viewBox='0 0 24 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 l12,20 l12,-20 l-12,-20 M0,40 l12,-20 l12,20 l-12,20' fill='none' stroke='%23FFA000' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: "24px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
            <Link href="/" className="group">
              {logoUrl ? (
                <div className="relative">
                  <Image
                    src={logoUrl}
                    alt="Logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/10 rounded-full transition-colors duration-300" />
                </div>
              ) : (
                <span
                  className="text-xl font-bold transition-colors"
                  style={{ color: textColor }}
                >
                  {title}
                </span>
              )}
            </Link>
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

export default Navbar;
