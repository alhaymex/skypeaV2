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
    {
      title: "Writers",
      url: `/projects/${slug}/writers`,
      icon: Users,
    },
    {
      title: "Messages",
      url: `/projects/${slug}/messages`,
      icon: MessageCircleMore,
    },
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
    <Sidebar
      collapsible="icon"
      className="
        bg-gradient-to-b from-amber-50 to-white 
        dark:from-gray-950 dark:to-gray-900
        border-r border-amber-300 
        dark:border-amber-900/50
      "
    >
      <SidebarHeader
        className="
        border-b border-amber-300 
        dark:border-amber-900/50 
        bg-white/50 dark:bg-gray-950/50 
        backdrop-blur-sm
      "
      >
        <ProjectSwitcher projects={projects as Blog[]} currentSlug={slug} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            className="
            px-3 
            text-amber-950 dark:text-amber-100 
            font-medium
          "
          >
            Blog Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <Link
                      href={item.url}
                      className={`
                        flex items-center px-3 py-2 rounded-lg 
                        text-amber-900 dark:text-amber-100
                        hover:bg-amber-100 dark:hover:bg-amber-900/20 
                        hover:text-amber-950 dark:hover:text-amber-50
                        active:bg-amber-200 dark:active:bg-amber-900/30
                        transition-colors duration-200
                        relative group
                      `}
                    >
                      {/* Hexagonal Hover Effect - Light Mode */}
                      <div
                        className="
                          absolute inset-0 
                          opacity-0 
                          transition-opacity 
                          hidden dark:group-hover:hidden
                        "
                        style={{
                          clipPath:
                            "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
                          background:
                            "linear-gradient(to right, #F59E0B, #D97706)",
                        }}
                      />

                      {/* Hexagonal Hover Effect - Dark Mode */}
                      <div
                        className="
                          absolute inset-0 
                          opacity-0 
                          transition-opacity 
                          hidden dark:group-hover:block
                        "
                        style={{
                          clipPath:
                            "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
                          background:
                            "linear-gradient(to right, #92400E, #B45309)",
                        }}
                      />

                      {/* Icon and Text */}
                      <div className="relative z-10 flex items-center">
                        <item.icon
                          className="
                          mr-2 h-4 w-4 
                          text-amber-800 dark:text-amber-300
                         dark:group-hover:text-amber-100
                        "
                        />
                        <span
                          className="
                          font-medium
                          text-amber-900 dark:text-amber-100
                          group-hover:text-amber-950 dark:group-hover:text-amber-50
                        "
                        >
                          {item.title}
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Decorative Elements */}
        <div className="absolute bottom-20 left-4 w-12 h-12 opacity-5 dark:opacity-[0.02]">
          <div
            className="w-full h-full bg-amber-700 dark:bg-amber-300"
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          />
        </div>
        <div className="absolute bottom-40 right-4 w-8 h-8 opacity-5 dark:opacity-[0.02]">
          <div
            className="w-full h-full bg-amber-700 dark:bg-amber-300"
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          />
        </div>
      </SidebarContent>

      <SidebarFooter
        className="
        border-t border-amber-300 dark:border-amber-900/50 
        bg-white/50 dark:bg-gray-950/50 
        backdrop-blur-sm
      "
      >
        <UserMenu user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
