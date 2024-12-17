import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { getBlogPost } from "@/actions/display-actions";

export async function generateMetadata(
  { params }: { params: Promise<{ blogSlug: string; slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { blogSlug, slug } = await params;

  const post = await getBlogPost(slug, blogSlug);

  const fallbackImage = "https://image.alhaymex.com/placeholder?shape=grid";

  const postImage = post.image || fallbackImage;

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
        ...previousImages,
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
