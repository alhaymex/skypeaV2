"use client";

import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Image from "next/image";
import "highlight.js/styles/github-dark.css";
import { ShareButton } from "@/components/blog-preview/ShareButton";

export type BlogPost = {
  id: string;
  blogSlug: string;
  title: string;
  image: string;
  slug: string;
  description: string;
  content: string;
  isNewsletter: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const BlogPage = ({
  params,
  blogPost,
}: {
  params: { slug: string; blogSlug: string };
  blogPost: BlogPost;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { slug, blogSlug } = params;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen p-8 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
          <div className="w-full sm:max-w-[calc(100%-70px)]">
            <h1 className="text-2xl sm:text-3xl font-bold line-clamp-2">
              {blogPost.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-2">
              {blogPost.description}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Published on{" "}
              {format(new Date(blogPost.createdAt), "MMMM d, yyyy")}
            </p>
          </div>
          <div className="flex gap-2">
            <ShareButton
              title={blogPost.title}
              url={`${window.location.origin}/${blogSlug}/${slug}`}
            />
            <Button
              onClick={toggleDarkMode}
              variant="secondary"
              size="icon"
              className="shrink-0"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button>
          </div>
        </div>

        {blogPost.image !=
          "https://image.alhaymex.com/placeholder?shape=grid" && (
          <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-md mb-8">
            <Image
              src={blogPost.image}
              alt={`${blogPost.title}'s cover image`}
              fill
              className="object-cover object-center transition-transform duration-300 hover:scale-105"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
              <p className="line-clamp-2 text-sm">{blogPost.description}</p>
            </div>
          </div>
        )}
        <div
          className="
            [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:leading-tight
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-4 [&_h2]:leading-tight
            [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-4 [&_h3]:leading-tight
            [&_p]:mb-4 [&_p]:leading-relaxed
            [&_blockquote]:border-l-4 [&_blockquote]:border-gray-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-gray-600
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4
            [&_li]:mb-2
            [&_a]:text-blue-500 [&_a]:underline [&_a]:transition-colors [&_a]:duration-200
            [&_a:hover]:text-blue-600
            [&_pre]:bg-gray-800 [&_pre]:text-gray-200 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre]:text-sm
            [&_code]:bg-gray-700 [&_code]:text-gray-200 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
            [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-6
            [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit
          "
        >
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
