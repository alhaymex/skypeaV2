"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { CheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import useProModal from "@/hooks/userProModal";

const freeFeatures: string[] = [
  "1 Blog",
  "3 pages per blog",
  "5 blog posts per month",
  "1,000 monthly visits",
  "1,000 emails per month",
  "Simple analytics",
];
const proFeatures: string[] = [
  "Unlimited blogs",
  "Up to 10 pages per blog",
  "Unlimited blog posts",
  "10,000 emails per month",
  "Custom domain support",
  "Advanced analytics",
];

const ProModal = () => {
  const { open, setOpen } = useProModal();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Skypea Pro</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p>Get Skypea Pro to unlock more blogs</p>
          <div className="flex">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">Free</h3>
              <ul className="list-inside space-y-2">
                {freeFeatures.map((feature) => (
                  <li key={feature} className="flex items-center space-x-2">
                    <CheckIcon className="h-4 w-4" />
                    <p>{feature}</p>
                  </li>
                ))}
              </ul>
              <Button>Continue with free plan</Button>
            </div>
            <div className="border-l mx-6" />
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">Pro</h3>
              <ul className="list-inside space-y-2">
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex items-center space-x-2">
                    <CheckIcon className="h-4 w-4" />
                    <p>{feature}</p>
                  </li>
                ))}
              </ul>
              <Button>Upgrade to Pro</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
