"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader } from "lucide-react";
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
import Link from "next/link";
import axios from "axios";

const plans = [
  {
    name: "Starter",
    price: { monthly: 0, annually: 0 },
    description:
      "Great for individuals starting with basic blogs or newsletters.",
    features: [
      "1 Blog",
      "3 pages per blog",
      "5 blog posts per month",
      "1,000 monthly visits",
      "1,000 emails per month",
      "Simple analytics",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: { monthly: 9.99, annually: 99.99 },
    description:
      "Designed for creators looking to scale their blogs or newsletters.",
    features: [
      "Unlimited blogs",
      "Up to 10 pages per blog",
      "Unlimited blog posts per month",
      "50,000 monthly visits",
      "10,000 emails per month",
      "Custom domain support",
      "Advanced analytics",
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
    <div className="grid gap-4 md:grid-cols-2">
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
              {plan.name === "Starter" && (
                <Button className="w-full" asChild variant={"outline"}>
                  <Link href="/login">{plan.cta}</Link>
                </Button>
              )}
              {plan.name === "Pro" && billingPeriod === "monthly" && (
                <Button
                  className="w-full"
                  onClick={() => handleBuyMonthly()}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    plan.cta
                  )}
                </Button>
              )}
              {plan.name === "Pro" && billingPeriod === "annually" && (
                <Button
                  className="w-full"
                  onClick={() => handleBuyAnnually()}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    plan.cta
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
