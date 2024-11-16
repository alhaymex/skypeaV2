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

export default function DashboardSidebar({ slug }: { slug: string }) {
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
      url: `/projects/${slug}`,
      icon: Home,
      isActive: currentPath === `/project/${slug}`,
    },
    {
      title: "Posts",
      url: `/projects/${slug}/posts`,
      icon: FileText,
      isActive: currentPath === `/project/${slug}/posts`,
    },
    {
      title: "Editor",
      url: `/projects/${slug}/editor`,
      icon: PenTool,
      isActive: currentPath === `/project/${slug}/editor`,
    },
    {
      title: "Subscribers",
      url: `/projects/${slug}/subscribers`,
      icon: Users,
      isActive: currentPath === `/project/${slug}/subscribers`,
    },
    {
      title: "Newsletters",
      url: `/projects/${slug}/newsletters`,
      icon: Mail,
      isActive: currentPath === `/project/${slug}/newsletters`,
    },
    {
      title: "Analytics",
      url: `/projects/${slug}/analytics`,
      icon: BarChart,
      isActive: currentPath === `/project/${slug}/analytics`,
    },
    {
      title: "Settings",
      url: `/projects/${slug}/settings`,
      icon: Settings,
      isActive: currentPath === `/project/${slug}/settings`,
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
