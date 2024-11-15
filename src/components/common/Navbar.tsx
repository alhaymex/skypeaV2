"use client";
import Link from "next/link";
import { Pen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// VisuallyHidden component
const VisuallyHidden = ({ children }: { children: React.ReactNode }) => (
  <span className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0">
    {children}
  </span>
);

export default function LandingPageNav() {
  const NavLinks = () => (
    <>
      <NavigationMenuItem>
        <Link href="#features" legacyBehavior passHref>
          <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
            Features
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="#pricing" legacyBehavior passHref>
          <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
            Pricing
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li className="row-span-3">
              <NavigationMenuLink asChild>
                <a
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="/templates"
                >
                  <Pen className="h-6 w-6" />
                  <div className="mb-2 mt-4 text-lg font-medium">Templates</div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    Explore our collection of customizable blog and newsletter
                    templates.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <a
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  href="/blog"
                >
                  <div className="text-sm font-medium leading-none">Blog</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Read our latest articles on content creation and audience
                    engagement.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <a
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  href="/about"
                >
                  <div className="text-sm font-medium leading-none">
                    About Us
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {`Learn more about Skypea's mission and team.`}
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/contact" legacyBehavior passHref>
          <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
            Contact
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </>
  );

  return (
    <header className="border-b flex justify-center">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Pen className="h-6 w-6" />
          <span className="text-xl font-bold">Skypea</span>
        </Link>
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavLinks />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden>
              </SheetHeader>
              <nav className="flex flex-col space-y-4">
                <Link href="#features" className="text-lg font-medium">
                  Features
                </Link>
                <Link href="#pricing" className="text-lg font-medium">
                  Pricing
                </Link>
                <Link href="/templates" className="text-lg font-medium">
                  Templates
                </Link>
                <Link href="/blog" className="text-lg font-medium">
                  Blog
                </Link>
                <Link href="/about" className="text-lg font-medium">
                  About
                </Link>
                <Link href="/contact" className="text-lg font-medium">
                  Contact
                </Link>
                <div className="pt-4">
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/login">Log in</Link>
                  </Button>
                </div>
                <div>
                  <Button className="w-full" asChild>
                    <Link href="/signup">Sign up</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
