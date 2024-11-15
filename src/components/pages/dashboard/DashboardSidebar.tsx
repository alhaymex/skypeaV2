"use client";

import {
  Home,
  FileText,
  Users,
  BarChart,
  Settings,
  User2,
  ChevronUp,
  Mail,
  PenTool,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProjectSwitcher } from "./ProjectSwitcher";

export default function DashboardSidebar() {
  const currentPath = usePathname();

  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: currentPath === "/dashboard",
    },
    {
      title: "Posts",
      url: "/dashboard/posts",
      icon: FileText,
      isActive: currentPath === "/dashboard/posts",
    },
    {
      title: "Editor",
      url: "/dashboard/editor",
      icon: PenTool,
      isActive: currentPath === "/dashboard/editor",
    },
    {
      title: "Subscribers",
      url: "/dashboard/subscribers",
      icon: Users,
      isActive: currentPath === "/dashboard/subscribers",
    },
    {
      title: "Newsletters",
      url: "/dashboard/newsletters",
      icon: Mail,
      isActive: currentPath === "/dashboard/newsletters",
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart,
      isActive: currentPath === "/dashboard/analytics",
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      isActive: currentPath === "/dashboard/settings",
    },
  ];

  const projects = [
    {
      name: "TechTalk Blog",
      logo: GalleryVerticalEnd,
      plan: "Pro",
    },
    {
      name: "Code Insights",
      logo: AudioWaveform,
      plan: "Free",
    },
    {
      name: "DevHub Daily",
      logo: Command,
      plan: "Premium",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <ProjectSwitcher projects={projects} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Blog Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className={item.isActive ? "bg-secondary" : ""}
                      href={item.url}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 className="mr-2 h-4 w-4" /> John Doe
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
