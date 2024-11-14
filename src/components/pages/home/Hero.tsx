"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative overflow-hidden bg-background sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
          <div className="max-w-lg mx-auto lg:mx-0">
            <motion.h1
              className="text-4xl font-bold tracking-tight text-primary sm:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Elevate Your Blogging Experience
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {`Craft compelling stories, engage your audience, and soar to new
              heights with Skypea's innovative blogging platform. Perfect for
              writers, creators, and thought leaders.`}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/login">Start Your Blog</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="#features">Explore Features</Link>
              </Button>
            </motion.div>
          </div>
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <div className="aspect-w-16 aspect-h-9 rounded-2xl bg-gradient-to-br from-sky-400/20 to-sky-600/5 shadow-2xl">
                <div className="flex items-center justify-center">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-24 h-24 text-sky-500/40"
                    animate={{ rotate: isHovered ? 360 : 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </motion.svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
