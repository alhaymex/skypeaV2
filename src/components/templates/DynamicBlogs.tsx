import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getBlogPostsForDisplay } from "@/actions/display-actions";
import { CalendarIcon, UserIcon } from "lucide-react";

type Post = {
  id: string;
  blogSlug: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  slug: string;
  title: string;
  content: string;
  isNewsletter: boolean | null;
  image: string;
};

const truncateText = (text: string | null, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const DynamicBlogs = async ({ slug }: { slug: string }) => {
  try {
    const posts = await getBlogPostsForDisplay(slug);

    return (
      <section className="max-w-7xl mx-auto my-12 px-4">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post as Post} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return <div>Error loading blog posts. Please try again later.</div>;
  }
};

const BlogCard = ({ post }: { post: Post }) => (
  <Card className="overflow-hidden transition-shadow hover:shadow-lg">
    <Link href={`/p/${post.slug}`} className="block">
      <div className="aspect-video relative">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
          {truncateText(post.title, 50)}
        </h3>
        <p className="text-muted-foreground line-clamp-3">
          {truncateText(post.description, 100)}
        </p>
      </CardContent>
    </Link>
    <CardFooter className="px-4 py-3 border-t flex justify-between items-center text-sm text-muted-foreground">
      <div className="flex items-center">
        <UserIcon className="w-4 h-4 mr-2" />
        <span>Alharith Yassin</span>
      </div>
      <div className="flex items-center">
        <CalendarIcon className="w-4 h-4 mr-2" />
        <time dateTime={post.createdAt.toISOString()}>
          {post.createdAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </div>
    </CardFooter>
    <CardFooter className="p-4 pt-0">
      <Button asChild variant="outline" className="w-full">
        <Link href={`/p/${post.slug}`}>Read More</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default DynamicBlogs;
