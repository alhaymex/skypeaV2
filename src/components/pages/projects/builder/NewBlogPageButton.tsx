"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { canCreateBlogPage } from "@/lib/permissions";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { Loader, Plus } from "lucide-react";
import React, { useState } from "react";
import { Page } from "./MainContent";
import useProModal from "@/hooks/userProModal";

interface NewBlogPageButtonProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  newPageName: string;
  setNewPageName: (name: string) => void;
  addNewPage: () => void;
  isValidPageName: boolean;
  validationMessage: string;
  pages: Page[];
}

const NewBlogPageButton = ({
  isDialogOpen,
  setIsDialogOpen,
  newPageName,
  setNewPageName,
  addNewPage,
  isValidPageName,
  validationMessage,
  pages,
}: NewBlogPageButtonProps) => {
  const plan = useSubscription();
  const proModal = useProModal();

  const [btnLoading, setBtnLoading] = useState(false);

  const handleAddPage = async () => {
    setBtnLoading(true);
    try {
      await addNewPage();
    } finally {
      setBtnLoading(false);
    }
  };

  if (canCreateBlogPage(plan, pages.length)) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="ml-2">
            <Plus className="h-4 w-4 mr-2" /> Add Page
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Page</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                placeholder="Page name will be used as the URL (e.g. About: /about)"
              />
              <Button
                onClick={handleAddPage}
                disabled={!isValidPageName || btnLoading}
              >
                {btnLoading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  "Add"
                )}
              </Button>
            </div>
            {validationMessage && (
              <p className="text-sm text-red-500">{validationMessage}</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="ml-2"
      onClick={() => proModal.setOpen(true)}
    >
      <Plus className="h-4 w-4 mr-2" /> Add Page
    </Button>
  );
};

export default NewBlogPageButton;
