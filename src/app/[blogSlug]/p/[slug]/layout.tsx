import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { getBlogPost } from "@/actions/display-actions";

export async function generateMetadata(
  { params }: { params: Promise<{ blogSlug: string; slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { blogSlug, slug } = await params;
  const post = await getBlogPost(slug, blogSlug);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description as string,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      url: `https://${blogSlug}skypea.net/p/${slug}`,
      images: [
        {
          url: post.image as string,
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
      description: post.description as string,
      images: [post.image as string],
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
