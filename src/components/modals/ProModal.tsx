"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import useProModal from "@/hooks/userProModal";

const features = [
  "Number of Blogs",
  "Pages per blog",
  "Blog posts per month",
  "Monthly visits",
  "Emails per month",
  "Analytics",
  "Custom domain support",
];

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["1", "3", "5", "1,000", "1,000", "Simple", ""],
    buttonText: "Continue with Free",
    buttonVariant: "outline",
  },
  {
    name: "Pro",
    price: "$19",
    features: [
      "Unlimited",
      "10",
      "Unlimited",
      "10,000",
      "10,000",
      "Advanced",
      "✓",
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "default",
  },
];

const ProModal = () => {
  const { open, setOpen } = useProModal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Upgrade to access more features
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan, planIndex) => (
              <motion.div
                key={plan.name}
                className="bg-card rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: planIndex * 0.2 }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-center mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-3xl font-bold text-center mb-6">
                    {plan.price}
                    <span className="text-sm font-normal">/month</span>
                  </p>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={feature} className="flex items-center space-x-3">
                        {plan.features[index] ? (
                          <>
                            <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-sm">
                              {feature}: <strong>{plan.features[index]}</strong>
                            </span>
                          </>
                        ) : (
                          <>
                            <XIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-muted mt-6">
                  {plan.name == "Free" ? (
                    <Button
                      variant={plan.buttonVariant as "outline" | "default"}
                      className="w-full"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      {plan.buttonText}
                    </Button>
                  ) : (
                    <Button
                      variant={plan.buttonVariant as "outline" | "default"}
                      className="w-full"
                    >
                      {plan.buttonText}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
