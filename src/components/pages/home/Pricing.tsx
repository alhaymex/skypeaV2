"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, annually: 0 },
    description:
      "Perfect for individuals starting with basic websites or blogs.",
    features: [
      "Up to 3 pages per site",
      "Access to standard components",
      "Basic templates",
      "Community support",
      "1,000 monthly visits",
      "Basic SEO tools",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: { monthly: 9.99, annually: 99.99 },
    description:
      "For creators and businesses ready to take their websites to the next level.",
    features: [
      "Unlimited pages per site",
      "Access to all components (standard and premium)",
      "Professional templates",
      "Advanced analytics",
      "Custom domain support",
      "Unlimited monthly visits",
      "Advanced SEO tools",
      "Priority email support",
    ],
    cta: "Upgrade to Pro",
  },
];

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Choose the Perfect Plan for Your Needs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {`Whether you're just starting out or scaling up, we have a plan
            that's right for you`}
          </p>
        </div>
        <Tabs defaultValue="monthly" className="flex flex-col items-center">
          <TabsList className="mb-8">
            <TabsTrigger
              value="monthly"
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="annually"
              onClick={() => setBillingPeriod("annually")}
            >
              Annually{" "}
              <span className="ml-1 text-xs text-primary">(Save 20%)</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="w-full">
            <PricingCards billingPeriod={billingPeriod} />
          </TabsContent>
          <TabsContent value="annually" className="w-full">
            <PricingCards billingPeriod={billingPeriod} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function PricingCards({ billingPeriod }: { billingPeriod: string }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-4xl font-bold mb-6">
                $
                {billingPeriod === "annually"
                  ? plan.price.annually
                  : plan.price.monthly}
                <span className="text-sm font-normal text-muted-foreground">
                  /{billingPeriod === "annually" ? "year" : "month"}
                </span>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.name === "Pro" ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
