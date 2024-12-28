"use client";

import { BlogPost } from "@/app/[blogSlug]/p/[slug]/BlogPage";
import { Button } from "@/components/ui/button";
import { canCreateBlogPost } from "@/lib/permissions";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Post } from "./page";
import useProModal from "@/hooks/userProModal";

const NewPostButton = ({ posts }: { posts: Post[] }) => {
  const proModal = useProModal();
  const plan = useSubscription();
  const canCreate = canCreateBlogPost(plan, posts as BlogPost[]);

  if (canCreate) {
    return (
      <Button asChild>
        <Link href="./posts/new">
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Link>
      </Button>
    );
  }

  return (
    <Button onClick={() => proModal.setOpen(true)}>
      <Plus className="mr-2 h-4 w-4" /> New Post
    </Button>
  );
};

export default NewPostButton;
