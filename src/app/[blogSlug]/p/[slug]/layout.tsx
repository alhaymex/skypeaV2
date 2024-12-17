import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { getBlogPost } from "@/actions/display-actions";

function getValidImageUrl(imageUrl: string | null | undefined): string {
  const fallbackImage =
    "https://image.alhaymex.com/placeholder?width=1200&height=630";
  if (!imageUrl || !imageUrl.startsWith("http")) {
    return fallbackImage;
  }
  return imageUrl;
}

export async function generateMetadata(
  { params }: { params: Promise<{ blogSlug: string; slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { blogSlug, slug } = await params;

  let post;
  try {
    post = await getBlogPost(slug, blogSlug);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const postImage = getValidImageUrl(post.image);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.description || "A blog post on Skypea",
    openGraph: {
      title: post.title,
      description: post.description || "A blog post on Skypea",
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      url: `https://${blogSlug}.skypea.net/p/${slug}`,
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || "A blog post on Skypea",
      images: [postImage],
    },
    alternates: {
      canonical: `https://${blogSlug}.skypea.net/p/${slug}`,
    },
  };
}

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string; blogSlug: string }>;
}) {
  const { slug, blogSlug } = await params;

  return <main>{children}</main>;
}
