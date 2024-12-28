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

  const AddPageButton = ({ onClick }: { onClick?: () => void }) => (
    <Button
      variant="ghost"
      size="sm"
      className="ml-2 border border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
      onClick={onClick}
    >
      <Plus className="h-4 w-4 mr-2" /> Add Page
    </Button>
  );

  if (canCreateBlogPage(plan, pages.length)) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <AddPageButton />
        </DialogTrigger>
        <DialogContent className="bg-gradient-to-b from-amber-50/90 to-white border border-amber-200">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-amber-900">Add New Page</DialogTitle>
            <p className="text-sm text-amber-600">
              Create a new page for your blog
            </p>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-100 opacity-30"
                style={{
                  clipPath:
                    "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                }}
              />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    value={newPageName}
                    onChange={(e) => setNewPageName(e.target.value)}
                    placeholder="Page name will be used as the URL (e.g. About: /about)"
                    className="flex-1 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                  />
                  <Button
                    onClick={handleAddPage}
                    disabled={!isValidPageName || btnLoading}
                    className={`
                      min-w-[80px]
                      ${
                        btnLoading
                          ? "bg-amber-100 text-amber-700"
                          : "bg-amber-500 hover:bg-amber-600 text-white"
                      }
                    `}
                    style={{
                      clipPath:
                        "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
                    }}
                  >
                    {btnLoading ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      "Add"
                    )}
                  </Button>
                </div>
                {validationMessage && (
                  <div className="p-2 rounded-md bg-red-50 border border-red-200">
                    <p className="text-sm text-red-600 flex items-center">
                      {validationMessage}
                    </p>
                  </div>
                )}
                <div className="text-xs text-amber-600 bg-amber-50/50 p-2 rounded-md">
                  <p>
                    The page name will automatically be converted to a
                    URL-friendly format.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return <AddPageButton onClick={() => proModal.setOpen(true)} />;
};

export default NewBlogPageButton;
