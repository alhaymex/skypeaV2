"use client";

import { useState, useEffect } from "react";
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
import { getBlogPosts } from "@/actions/posts-actions";
import { useParams } from "next/navigation";

// Define the type for your posts
type Post = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string;
  isNewsletter: boolean | null;
  createdAt: Date;
  updatedAt: Date;
};

export default function PostsPage() {
  const params = useParams();
  const blogSlug = params.slug as string;

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      try {
        const result = await getBlogPosts(blogSlug);

        if (result.success && result.posts) {
          setPosts(result.posts);
          setError(null);
        } else {
          setError(result.error || "Failed to fetch posts");
          setPosts([]);
        }
      } catch (err) {
        setError("An unexpected error occurred");
        setPosts([]);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [blogSlug]);

  const togglePostSelection = (postId: string) => {
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

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

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
            <TableHead>Type</TableHead>
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
              <TableCell>{post.isNewsletter ? "Newsletter" : "Post"}</TableCell>
              <TableCell>
                {new Date(post.createdAt).toLocaleDateString()}
              </TableCell>
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
      {posts.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          No posts found for this blog.
        </div>
      )}
    </div>
  );
}
