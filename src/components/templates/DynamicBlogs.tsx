import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBlogPostsForDisplay } from "@/actions/display-actions";
import { CalendarIcon } from "lucide-react";
import AuthorAvatars from "./AuthorAvatars";
import type { Author } from "./AuthorAvatars";

type Writer = {
  id: string;
  name: string;
  avatar: string | null;
};

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
  writers: string[]; // Array of writer IDs
};

const truncateText = (text: string | null, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const DynamicBlogs = async ({ slug }: { slug: string }) => {
  try {
    const { posts, writers } = await getBlogPostsForDisplay(slug);

    // Create a map of writers for easy lookup
    const writersMap = writers.reduce((map, writer) => {
      map[writer.id] = writer;
      return map;
    }, {} as Record<string, Writer>);

    return (
      <section className="max-w-7xl mx-auto my-12 px-4">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post as Post} writers={writers} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return <div>Error loading blog posts. Please try again later.</div>;
  }
};

const BlogCard = ({ post, writers }: { post: Post; writers: Writer[] }) => {
  // Transform writers to match the Author type
  const authors: Author[] = writers.map((writer) => ({
    id: writer.id,
    name: writer.name,
    avatar:
      writer.avatar ??
      `https://image.alhaymex.com/initials?initials=${encodeURIComponent(
        writer.name.charAt(0)
      )}`,
  }));

  return (
    <Card
      key={post.id}
      className="overflow-hidden transition-shadow hover:shadow-lg"
    >
      <Link href={`/p/${post.slug}`} className="block">
        <div className="aspect-video relative">
          <Image
            src={post.image}
            alt={post.title}
            fill
            unoptimized
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
        <div className="flex items-center space-x-2">
          {authors.length > 0 ? (
            <>
              <AuthorAvatars authors={authors} />
              <span>
                {truncateText(
                  authors.map((author) => author.name).join(", "),
                  15
                )}
              </span>
            </>
          ) : (
            <span>No authors</span>
          )}
        </div>
        <div className="flex items-center">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <time dateTime={new Date(post.createdAt).toISOString()}>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
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
};

export default DynamicBlogs;
