"use client";
import { useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { AccountDropdown } from "./AccountDropdown";
import ThemeToggleButton from "./ThemeToggleButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

interface NavLinksProps {
  className?: string;
  onClick?: () => void;
}

export default function ProjectsNavbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    {
      name: "Projects",
      href: "/projects",
      current: pathname === "/projects",
    },
    {
      name: "Account Settings",
      href: "/account",
      current: pathname === "/account",
    },
  ];

  const NavLinks = ({ className = "", onClick }: NavLinksProps) => (
    <nav className={`flex ${className}`}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
            item.current
              ? "text-foreground bg-primary/10"
              : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
          }`}
          onClick={onClick}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center gap-2 px-2">
                  <Image
                    src="/Skypea-black.svg"
                    alt="Skypea Logo"
                    width={120}
                    height={120}
                    className="block dark:hidden"
                  />
                  <Image
                    src="/Skypea-white.svg"
                    alt="Skypea Logo"
                    width={120}
                    height={120}
                    className="hidden dark:block"
                  />
                </div>
                <NavLinks
                  className="flex-col space-y-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/projects" className="flex items-center gap-2">
            <Image
              src="/Skypea-black.svg"
              alt="Skypea Logo"
              width={120}
              height={120}
              className="block dark:hidden"
            />
            <Image
              src="/Skypea-white.svg"
              alt="Skypea Logo"
              width={120}
              height={120}
              className="hidden dark:block"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>

          <Button
            variant="default"
            className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Upgrade
          </Button>

          <ThemeToggleButton />

          <div className="flex">
            <AccountDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
