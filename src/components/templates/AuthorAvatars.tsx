import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type Author = {
  id: string;
  name: string;
  avatar: string;
};

const AuthorAvatars = ({ authors }: { authors: Author[] }) => {
  return (
    <div className="flex -space-x-2 overflow-hidden">
      {authors.map((author, index) => (
        <TooltipProvider key={author.id}>
          <Tooltip>
            <TooltipTrigger>
              <Avatar
                className={`inline-block border-2 border-background ${
                  index > 0 ? "-ml-4" : ""
                }`}
                key={author.id}
              >
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{author.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default AuthorAvatars;
