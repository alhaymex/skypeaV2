"use client";

import {
  Home,
  FileText,
  Users,
  BarChart,
  Settings,
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

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProjectSwitcher } from "./ProjectSwitcher";
import { UserMenu, UserMenuProps } from "./UserMenu";
import { useSession } from "next-auth/react";

export default function DashboardSidebar() {
  const currentPath = usePathname();
  const session = useSession();

  const user = {
    name: session.data?.user?.name,
    email: session.data?.user?.email,
    avatar: session.data?.user?.image,
  };

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
    <Sidebar collapsible="icon">
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
        <UserMenu user={user as UserMenuProps} />
      </SidebarFooter>
    </Sidebar>
  );
}
