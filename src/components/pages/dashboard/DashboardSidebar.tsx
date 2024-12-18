import {
  Home,
  FileText,
  Users,
  BarChart,
  Settings,
  Mail,
  PenTool,
  MessageCircleMore,
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
import { ProjectSwitcher } from "./ProjectSwitcher";
import { UserMenu } from "./UserMenu";
import { getBlogs } from "@/actions/blogs-actions";
import { Blog, UserMenuProps } from "@/types/types";

export default async function DashboardSidebar({
  slug,
  user,
}: {
  slug: string;
  user: UserMenuProps;
}) {
  const projects = await getBlogs();

  const items = [
    {
      title: "Dashboard",
      url: `/projects/${slug}`,
      icon: Home,
    },
    {
      title: "Builder",
      url: `/projects/${slug}/builder`,
      icon: PenTool,
    },
    {
      title: "Posts",
      url: `/projects/${slug}/posts`,
      icon: FileText,
    },
    // {
    //   title: "Messages",
    //   url: `/projects/${slug}/messages`,
    //   icon: MessageCircleMore,
    // },
    // {
    //   title: "Subscribers",
    //   url: `/projects/${slug}/subscribers`,
    //   icon: Users,
    // },
    // {
    //   title: "Newsletters",
    //   url: `/projects/${slug}/newsletters`,
    //   icon: Mail,
    // },
    // {
    //   title: "Analytics",
    //   url: `/projects/${slug}/analytics`,
    //   icon: BarChart,
    // },
    {
      title: "Settings",
      url: `/projects/${slug}/settings`,
      icon: Settings,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <ProjectSwitcher projects={projects as Blog[]} currentSlug={slug} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Blog Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
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
        <UserMenu user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
