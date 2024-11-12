"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Menu,
  X,
  PenSquare,
  BarChart,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const DesktopNav = () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Create</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <PenSquare className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      New Newsletter
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Start crafting your next engaging newsletter.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/"
                  >
                    <div className="text-sm font-medium leading-none">
                      Templates
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Choose from our pre-designed templates.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/"
                  >
                    <div className="text-sm font-medium leading-none">
                      Customization
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {`Personalize your newsletter's look and feel.`}
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Manage</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {[
                {
                  title: "Analytics",
                  href: "/analytics",
                  description:
                    "Track your newsletter performance and engagement.",
                  icon: BarChart,
                },
                {
                  title: "Subscribers",
                  href: "/subscribers",
                  description: "Manage your subscriber list and segments.",
                  icon: User,
                },
                {
                  title: "Settings",
                  href: "/settings",
                  description:
                    "Configure your newsletter and account settings.",
                  icon: Settings,
                },
              ].map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink asChild>
                    <a
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href={item.href}
                    >
                      <div className="flex items-center space-x-2">
                        <item.icon className="h-4 w-4" />
                        <div className="text-sm font-medium leading-none">
                          {item.title}
                        </div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {item.description}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/pricing" legacyBehavior passHref>
            <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
              Pricing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  const MobileNav = () => (
    <nav className="flex flex-col space-y-4">
      <Link
        href="/new-newsletter"
        className="flex items-center space-x-2 text-lg font-medium"
      >
        <PenSquare className="h-5 w-5" />
        <span>New Newsletter</span>
      </Link>
      <Link
        href="/templates"
        className="flex items-center space-x-2 text-lg font-medium"
      >
        <Mail className="h-5 w-5" />
        <span>Templates</span>
      </Link>
      <Link
        href="/customize"
        className="flex items-center space-x-2 text-lg font-medium"
      >
        <Settings className="h-5 w-5" />
        <span>Customize</span>
      </Link>
      <Link
        href="/analytics"
        className="flex items-center space-x-2 text-lg font-medium"
      >
        <BarChart className="h-5 w-5" />
        <span>Analytics</span>
      </Link>
      <Link
        href="/subscribers"
        className="flex items-center space-x-2 text-lg font-medium"
      >
        <User className="h-5 w-5" />
        <span>Subscribers</span>
      </Link>
      <Link
        href="/settings"
        className="flex items-center space-x-2 text-lg font-medium"
      >
        <Settings className="h-5 w-5" />
        <span>Settings</span>
      </Link>
      <Link
        href="/pricing"
        className="flex items-center space-x-2 text-lg font-medium"
      >
        <Mail className="h-5 w-5" />
        <span>Pricing</span>
      </Link>
      <div className="pt-4">
        <Button className="w-full" variant="outline">
          Log in
        </Button>
      </div>
      <div>
        <Button className="w-full">Sign up</Button>
      </div>
    </nav>
  );

  return (
    <header className="border-b flex justify-center">
      <div className="container flex h-16 items-center justify-between px-4 lg:justify-center lg:gap-8">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Mail className="h-6 w-6" />
            <span className="text-xl font-bold">NewsletterPro</span>
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <DesktopNav />
        </div>
        <div className="hidden items-center space-x-4 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/sign-in">Log in</Link>
          </Button>
          <Button size="sm">Sign up</Button>
        </div>
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={toggleMenu}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <MobileNav />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
