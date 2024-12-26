"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NewProjectForm from "./NewProjectForm";
import useProModal from "@/hooks/userProModal";

interface NewProjectButtonProps {
  canCreate: boolean;
}

export default function NewProjectButton({ canCreate }: NewProjectButtonProps) {
  const proModal = useProModal();
  if (canCreate) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>New blog</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create New Blog</SheetTitle>
          </SheetHeader>
          <div className="p-3">
            <NewProjectForm />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return <Button onClick={() => proModal.setOpen(true)}>New blog</Button>;
}
