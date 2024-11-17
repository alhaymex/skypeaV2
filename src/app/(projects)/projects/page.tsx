"use client";

import { useState } from "react";
import {
  Search,
  MoreVertical,
  Pin,
  Layers,
  Newspaper,
  Plane,
  Dumbbell,
  UtensilsCrossed,
  BookOpen,
  PiggyBank,
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

interface Project {
  id: string;
  name: string;
  slug: string;
  icon: React.ElementType;
  status: "live" | "building";
  lastUpdated: string;
  pinned: boolean;
}

const projects: Project[] = [
  {
    id: "1",
    name: "Tech Insights Newsletter",
    slug: "tech-insights-newsletter",
    icon: Newspaper,
    status: "live",
    lastUpdated: "1 day ago",
    pinned: true,
  },
  {
    id: "2",
    name: "Travel Blog",
    slug: "travel-blog",
    icon: Plane,
    status: "live",
    lastUpdated: "13 days ago",
    pinned: true,
  },
  {
    id: "3",
    name: "Fitness Tips",
    slug: "fitness-tips",
    icon: Dumbbell,
    status: "building",
    lastUpdated: "2 days ago",
    pinned: true,
  },
  {
    id: "4",
    name: "Cooking Chronicles",
    slug: "cooking-chronicles",
    icon: UtensilsCrossed,
    status: "live",
    lastUpdated: "33 days ago",
    pinned: false,
  },
  {
    id: "5",
    name: "Book Reviews",
    slug: "book-reviews",
    icon: BookOpen,
    status: "building",
    lastUpdated: "27 days ago",
    pinned: false,
  },
  {
    id: "6",
    name: "Personal Finance Tips",
    slug: "personal-finance-tips",
    icon: PiggyBank,
    status: "building",
    lastUpdated: "30 days ago",
    pinned: false,
  },
];

export default function ProjectsDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectList, setProjectList] = useState(projects);

  const pinnedProjects = projectList.filter((p) => p.pinned);
  const otherProjects = projectList.filter((p) => !p.pinned);

  const togglePin = (id: string) => {
    setProjectList(
      projectList.map((project) =>
        project.id === id ? { ...project, pinned: !project.pinned } : project
      )
    );
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
            <Button>New project</Button>
          </div>
          <div className="space-y-8">
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
            <project.icon className="h-6 w-6 text-primary" />
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
