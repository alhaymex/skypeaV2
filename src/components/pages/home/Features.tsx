"use client";

import { motion } from "framer-motion";
import {
  Pen,
  Users,
  Zap,
  Mail,
  Globe,
  BarChart,
  Lock,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    name: "Intuitive Content Creation",
    description:
      "Create with ease in a distraction-free editor featuring markdown support and auto-save.",
    icon: Pen,
  },
  {
    name: "Audience Engagement",
    description:
      "Build community with commenting, social sharing, and personalized newsletter segmentation.",
    icon: Users,
  },
  {
    name: "Lightning-Fast Performance",
    description:
      "Deliver content instantly with optimized load times and rapid newsletter delivery.",
    icon: Zap,
  },
  {
    name: "Powerful Newsletter Tools",
    description:
      "Easily design, schedule, and analyze newsletters in one seamless platform.",
    icon: Mail,
  },
  {
    name: "Custom Domain Support",
    description:
      "Enhance your brand with custom domains for both your blog and newsletters.",
    icon: Globe,
  },
  {
    name: "Advanced Analytics",
    description:
      "Track blog and newsletter performance with easy-to-use, insightful analytics.",
    icon: BarChart,
  },
  {
    name: "Robust Security",
    description:
      "Keep content and data safe with SSL encryption and regular backups.",
    icon: Lock,
  },
  {
    name: "Customizable Themes",
    description:
      "Match your brand with visually stunning, fully customizable themes.",
    icon: Palette,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {`Elevate Your Blog and Newsletter with Skypea's Powerful Features`}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Craft engaging content, grow your audience, and optimize your online
            presence with our comprehensive set of tools designed for modern
            content creators and newsletter publishers.
          </p>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="flex flex-col bg-background p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white dark:bg-secondary mb-4">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link href="/login">Start Your Blog and Newsletter Today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
