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
    description: "Perfect for getting started with blogging and newsletters",
    features: [
      "Up to 5 blog posts per month",
      "Up to 1,000 newsletter subscribers",
      "Basic analytics",
      "Standard themes",
      "Community support",
    ],
    cta: "Get Started",
  },
  {
    name: "Premium",
    price: { monthly: 12, annually: 120 },
    description: "Ideal for growing creators and small businesses",
    features: [
      "Unlimited blog posts",
      "Up to 10,000 newsletter subscribers",
      "Advanced analytics",
      "Premium themes",
      "Priority email support",
      "Custom domain",
    ],
    cta: "Upgrade to Premium",
  },
  {
    name: "Pro",
    price: { monthly: 29, annually: 290 },
    description: "For professional creators and large organizations",
    features: [
      "Unlimited blog posts",
      "Unlimited newsletter subscribers",
      "Advanced analytics with AI insights",
      "Custom themes",
      "24/7 priority support",
      "Custom domain",
      "White-label option",
      "API access",
    ],
    cta: "Go Pro",
  },
];

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Choose the Perfect Plan for Your Needs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {`Whether you're just starting out or scaling up, we have a plan
            that's right for you`}
          </p>
        </div>
        <Tabs
          defaultValue="monthly"
          className="mt-8 flex flex-col items-center"
        >
          <TabsList>
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
    <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-3xl font-bold mb-6">
                $
                {billingPeriod === "annually"
                  ? plan.price.annually
                  : plan.price.monthly}
                <span className="text-sm font-normal text-muted-foreground">
                  /month
                </span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.name === "Premium" ? "default" : "outline"}
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
