"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckIcon, Loader, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import useProModal from "@/hooks/userProModal";
import axios from "axios";

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
    features: ["1", "1", "5", "500", "1,000", "Simple", ""],
    buttonText: "Continue with Free",
    buttonVariant: "outline",
  },
  {
    name: "Pro",
    price: "$6.99",
    features: [
      "Unlimited",
      "10",
      "30+",
      "Unlimited",
      "Unlimited",
      "Advanced",
      "✓",
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "default",
  },
];

const ProModal = () => {
  const { open, setOpen } = useProModal();
  const [loading, setLoading] = useState(false);

  const handleBuyMonthly = async () => {
    setLoading(true);
    const response = await axios.post("/api/purchase", {
      productId: "622484",
    });
    window.open(response.data.checkoutUrl, "_blank");
    setLoading(false);
  };

  const handleBuyAnnually = async () => {
    setLoading(true);
    const response = await axios.post("/api/purchase", {
      productId: "622484",
    });
    window.open(response.data.checkoutUrl, "_blank");
    setLoading(false);
  };

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
                      onClick={() => handleBuyMonthly()}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader className="h-4 w-4 animate-spin" />
                      ) : (
                        plan.buttonText
                      )}
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
