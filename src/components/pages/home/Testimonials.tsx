"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    company: "TechTalks Blog",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "Skypea has transformed my blogging experience. The intuitive editor and powerful newsletter tools have helped me grow my audience significantly.",
  },
  {
    name: "Michael Chen",
    role: "Newsletter Publisher",
    company: "Data Insights Weekly",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "The analytics features in Skypea are a game-changer. I can now tailor my content based on real data, improving engagement with every issue.",
  },
  {
    name: "Emily Rodriguez",
    role: "Lifestyle Blogger",
    company: "Living Mindfully",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "I love how easy it is to create both blog posts and newsletters with Skypea. The customizable themes have given my brand a professional, cohesive look.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            What Our Creators Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear from content creators who have elevated their online presence
            with Skypea
          </p>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={testimonial.image}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <blockquote className="mt-4 text-muted-foreground">
                      {`"${testimonial.testimonial}"`}
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
