"use client";

import { useEffect, useState } from "react";
import {
  Search,
  MoreVertical,
  Pin,
  Layers,
  Settings,
  Trash2,
} from "lucide-react";
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
import { getBlogs, togglePin } from "@/actions/blogs-actions";
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
  const [isPinning, setIsPinning] = useState<string | null>(null);

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

  const pinProject = async (id: string) => {
    setProjectList((prevList) =>
      prevList.map((project) =>
        project.id === id ? { ...project, pinned: !project.pinned } : project
      )
    );

    try {
      setIsPinning(id);
      const res = await togglePin(id);

      if (res.isPinned !== undefined) {
        setProjectList((prevList) =>
          prevList.map((project) =>
            project.id === id
              ? { ...project, pinned: res.isPinned ?? project.pinned }
              : project
          )
        );
      }
    } catch (error) {
      console.error("Error toggling pin:", error);
      setProjectList((prevList) =>
        prevList.map((project) =>
          project.id === id ? { ...project, pinned: !project.pinned } : project
        )
      );
    } finally {
      setIsPinning(null);
    }
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
                          togglePin={pinProject}
                          isPinning={isPinning}
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
                        togglePin={pinProject}
                        isPinning={isPinning}
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

interface ProjectCardProps {
  project: Project;
  togglePin: (id: string) => Promise<void>;
  isPinning: string | null;
}

function ProjectCard({ project, togglePin, isPinning }: ProjectCardProps) {
  return (
    <div className="group relative">
      <Link
        href={`/projects/${project.slug}`}
        className="block bg-card rounded-lg p-4 border border-border shadow-sm hover:shadow-md transition-all hover:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BlogIcon icon={project.icon} className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <Badge
                variant={project.status === "live" ? "default" : "secondary"}
                className="mt-1"
              >
                {project.status === "live" ? "Live" : "Building"}
              </Badge>
            </div>
          </div>
          <div
            className="absolute top-4 right-4"
            onClick={(e) => e.preventDefault()}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Project options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuItem
                  onSelect={() => togglePin(project.id)}
                  className="cursor-pointer"
                >
                  <Pin
                    className={`mr-2 h-4 w-4 ${
                      isPinning === project.id ? "animate-spin" : ""
                    }`}
                  />
                  <span>
                    {project.pinned ? "Unpin Project" : "Pin Project"}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/projects/${project.slug}/settings`}
                    className="flex items-center"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Project Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          Last updated {project.lastUpdated}
        </div>
      </Link>
    </div>
  );
}
