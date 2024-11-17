"use client";

import { Bell, HelpCircle, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { AccountDropdown } from "./AccountDropdown";

export default function ProjectsNavbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/projects" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <span className="text-lg font-semibold text-primary">S</span>
            </div>
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session?.user?.image ?? ""}
                  alt={session?.user?.name ?? ""}
                />
                <AvatarFallback>
                  {session?.user?.name?.charAt(0) ?? "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <nav className="flex items-center gap-4 md:gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium ${
                    item.current
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="default"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Upgrade
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Help</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Moon className="h-5 w-5" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <AccountDropdown />
        </div>
      </div>
    </header>
  );
}
