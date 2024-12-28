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
              className="
                relative group
                hover:bg-amber-50 dark:hover:bg-amber-900/10
                data-[state=open]:bg-amber-100 dark:data-[state=open]:bg-amber-900/20
                data-[state=open]:text-amber-950 dark:data-[state=open]:text-amber-50
                transition-colors duration-200
                rounded-lg
              "
            >
              {/* Hexagonal Highlight Effect */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity"
                style={{
                  clipPath:
                    "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
                  background: "linear-gradient(to right, #FCD34D, #F59E0B)",
                }}
              />

              {/* Project Icon */}
              <div
                className="
                flex aspect-square size-8 items-center justify-center 
                rounded-lg bg-amber-100 dark:bg-amber-900/40
                text-amber-900 dark:text-amber-100
                relative z-10
              "
              >
                <BlogIcon icon={activeProject.icon || ""} />
              </div>

              {/* Project Info */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-amber-950 dark:text-amber-100">
                  {activeProject.name}
                </span>
                <span className="truncate text-xs text-amber-800 dark:text-amber-300">
                  {activeProject.slug}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto text-amber-700 dark:text-amber-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="
              w-[--radix-dropdown-menu-trigger-width] min-w-56 
              rounded-lg border-amber-300 dark:border-amber-800
              bg-white dark:bg-gray-950
              shadow-lg shadow-amber-100/20 dark:shadow-amber-900/20
            "
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel
              className="
              text-xs text-amber-800 dark:text-amber-300 
              px-3 py-2 font-medium
            "
            >
              Projects
            </DropdownMenuLabel>

            {projects.map((project) => (
              <DropdownMenuItem
                key={project.id}
                onClick={() => handleProjectSelect(project)}
                className="
                  gap-2 p-2 cursor-pointer
                  hover:bg-amber-50 dark:hover:bg-amber-900/20
                  focus:bg-amber-50 dark:focus:bg-amber-900/20
                  text-amber-950 dark:text-amber-100
                  outline-none
                "
              >
                <div
                  className="
                  bg-amber-100 dark:bg-amber-900/40 
                  p-1 rounded-lg
                  text-amber-900 dark:text-amber-100
                "
                >
                  <BlogIcon icon={project.icon || ""} className="h-4 w-4" />
                </div>
                {project.name}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator className="border-amber-200 dark:border-amber-800" />

            {/* Add Project Button */}
            <DropdownMenuItem
              className="
              gap-2 p-2
              hover:bg-amber-50 dark:hover:bg-amber-900/20
              focus:bg-amber-50 dark:focus:bg-amber-900/20
              outline-none
            "
            >
              <div
                className="
                flex size-6 items-center justify-center 
                rounded-lg border border-amber-300 dark:border-amber-700
                bg-white dark:bg-gray-900
              "
              >
                <Plus className="size-4 text-amber-700 dark:text-amber-400" />
              </div>
              <div className="font-medium text-amber-800 dark:text-amber-300">
                Add project
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
