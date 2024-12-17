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
            <BlogCard key={post.id} post={post} />
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
  <Card className="flex flex-col h-full">
    <CardHeader className="p-0">
      <div className="relative w-full pt-[56.25%]">
        <Image
          src="https://image.alhaymex.com/placeholder?shape=grid"
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          unoptimized
        />
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <CardTitle className="mb-2">{truncateText(post.title, 50)}</CardTitle>
      <CardDescription> {truncateText(post.description, 100)}</CardDescription>
    </CardContent>
    <CardFooter className="flex justify-between items-center">
      <div className="flex items-center">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage
            src={`https://image.alhaymex.com/initials?initials=ay`}
            alt="Author avatar"
          />
          <AvatarFallback>AY</AvatarFallback>
        </Avatar>
        <span className="text-sm text-muted-foreground">Alharith Yassin</span>
      </div>
      <time
        className="text-sm text-muted-foreground"
        dateTime={post.createdAt.toISOString()}
      >
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
    </CardFooter>
    <CardFooter>
      <Link href={`/blog/${post.slug}`} className=" w-full" passHref>
        <Button variant="outline" className="w-full">
          Read More
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

export default DynamicBlogs;
