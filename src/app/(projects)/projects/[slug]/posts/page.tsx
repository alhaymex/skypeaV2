"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PenSquare,
  MoreHorizontal,
  Trash2,
  Eye,
  Plus,
  Filter,
} from "lucide-react";
import Link from "next/link";

// Sample data for blog posts
const posts = [
  {
    id: 1,
    title: "Getting Started with React",
    status: "Published",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "Advanced TypeScript Techniques",
    status: "Draft",
    date: "2023-05-20",
  },
  {
    id: 3,
    title: "The Future of AI in Web Development",
    status: "Published",
    date: "2023-05-25",
  },
  {
    id: 4,
    title: "Optimizing Your Next.js Application",
    status: "Scheduled",
    date: "2023-06-01",
  },
  {
    id: 5,
    title: "Introduction to GraphQL",
    status: "Draft",
    date: "2023-06-05",
  },
];

export default function PostsPage() {
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);

  const togglePostSelection = (postId: number) => {
    setSelectedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const isAllSelected = selectedPosts.length === posts.length;
  const toggleAllSelection = () => {
    setSelectedPosts(isAllSelected ? [] : posts.map((post) => post.id));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Button asChild>
          <Link href="./posts/new">
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Link>
        </Button>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <Input placeholder="Search posts..." className="max-w-sm" />
        <Button variant="outline" className="ml-2">
          <Filter />
          Filter
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={toggleAllSelection}
                aria-label="Select all posts"
              />
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <Checkbox
                  checked={selectedPosts.includes(post.id)}
                  onCheckedChange={() => togglePostSelection(post.id)}
                  aria-label={`Select post ${post.title}`}
                />
              </TableCell>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.status}</TableCell>
              <TableCell>{post.date}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <PenSquare className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
