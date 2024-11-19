"use client";

import { useEffect, useState } from "react";
import { Search, MoreVertical, Pin, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import ProjectsNavbar from "@/components/pages/projects/ProjectsNavbar";
import NewProjectButton from "@/components/pages/projects/NewProjectButton";
import { getBlogs } from "@/actions/blogs-actions";
import { BlogIcon } from "@/components/pages/projects/BlogIcon";
import SkeletonProjectList from "@/components/pages/projects/BlogsListSkeleton";

interface Project {
  id: string;
  name: string;
  slug: string;
  icon: string;
  status: "live" | "building";
  lastUpdated: string;
  pinned: boolean;
}

export default function ProjectsDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const pinnedProjects = projectList.filter((p) => p.pinned);
  const otherProjects = projectList.filter((p) => !p.pinned);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const blogs = await getBlogs();
        const formattedProjects = blogs
          .filter((blog): blog is NonNullable<typeof blog> => blog !== null)
          .map((blog) => ({
            id: blog.id,
            name: blog.name || "Untitled Project",
            slug: blog.slug,
            icon: blog.icon ?? "",
            status: blog.isLive ? ("live" as const) : ("building" as const),
            lastUpdated: blog.updatedAt
              ? formatDate(blog.updatedAt.toString())
              : "No date",
            pinned: blog.isPinned || false,
          }));
        setProjectList(formattedProjects);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const togglePin = async (id: string) => {
    console.log("Toggle pin for project:", id);
  };

  const formatDate = (date: string) => {
    const now = new Date();
    const updated = new Date(date);
    const diffTime = Math.abs(now.getTime() - updated.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div>
      <ProjectsNavbar />
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <NewProjectButton />
          </div>
          <div className="space-y-8">
            {isLoading ? (
              <SkeletonProjectList />
            ) : (
              <>
                {pinnedProjects.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <Pin className="h-5 w-5" />
                      <h2 className="text-lg font-semibold">Pinned Projects</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pinnedProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          togglePin={togglePin}
                        />
                      ))}
                    </div>
                  </section>
                )}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Layers className="h-5 w-5" />
                    <h2 className="text-lg font-semibold">
                      {pinnedProjects.length > 0
                        ? "Other Projects"
                        : "All Projects"}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {otherProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        togglePin={togglePin}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  togglePin,
}: {
  project: Project;
  togglePin: (id: string) => void;
}) {
  return (
    <div className="bg-card rounded-lg p-4 border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BlogIcon icon={project.icon} className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">{project.name}</h3>
            <Badge
              variant={project.status === "live" ? "default" : "secondary"}
              className="mt-1"
            >
              {project.status === "live" ? "Live" : "Building"}
            </Badge>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => e.preventDefault()}
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem asChild>
              <Link href={`/projects/${project.slug}`}>View Project</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/projects/${project.slug}/settings`}>
                Project Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => togglePin(project.id)}>
              {project.pinned ? "Unpin Project" : "Pin Project"}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        Last updated {project.lastUpdated}
      </div>
    </div>
  );
}
