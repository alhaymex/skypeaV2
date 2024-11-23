"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Blog } from "@/types/types";
import { BlogIcon } from "../projects/BlogIcon";

export function ProjectSwitcher({
  projects: initialProjects,
  currentSlug,
}: {
  projects: Blog[];
  currentSlug: string;
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const [projects, setProjects] = React.useState(() => {
    const activeProject =
      initialProjects.find((p) => p.slug === currentSlug) || initialProjects[0];
    return [
      activeProject,
      ...initialProjects.filter((p) => p.id !== activeProject.id),
    ];
  });
  const [activeProject, setActiveProject] = React.useState(projects[0]);

  const handleProjectSelect = (project: Blog) => {
    setActiveProject(project);
    setProjects([project, ...projects.filter((p) => p.id !== project.id)]);
    router.push(`/projects/${project.slug}`);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <BlogIcon icon={activeProject.icon || ""} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeProject.name}
                </span>
                <span className="truncate text-xs">{activeProject.slug}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Projects
            </DropdownMenuLabel>
            {projects.map((project) => (
              <DropdownMenuItem
                key={project.id}
                onClick={() => handleProjectSelect(project)}
                className="gap-2 p-2 cursor-pointer "
              >
                <div className="flex size-6 items-center justify-center bg-secondary p-1 rounded-sm">
                  <BlogIcon icon={project.icon || ""} />
                </div>
                {project.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add project
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
