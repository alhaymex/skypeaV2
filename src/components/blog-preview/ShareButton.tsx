"use client";

import React from "react";
import {
  Share2,
  Link,
  Twitter,
  Facebook,
  Linkedin,
  Check,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonProps {
  title: string;
  url: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const { toast } = useToast();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied to clipboard",
      });
    } catch (err) {}
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="shrink-0">
          <Share2 className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Share post</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          <Link className="mr-2 h-4 w-4" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareToTwitter} className="cursor-pointer">
          <Twitter className="mr-2 h-4 w-4" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareToFacebook} className="cursor-pointer">
          <Facebook className="mr-2 h-4 w-4" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareToLinkedIn} className="cursor-pointer">
          <Linkedin className="mr-2 h-4 w-4" />
          Share on LinkedIn
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
