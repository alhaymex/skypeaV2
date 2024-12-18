import Image from "next/image";
import Link from "next/link";
import { Pen, Rocket, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">About Skypea</h1>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-muted-foreground mb-4">
          At Skypea, we&apos;re on a mission to empower bloggers and content
          creators with powerful, easy-to-use tools. We believe that everyone
          has a story to tell, and we&apos;re here to help you share yours with
          the world.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <Card>
            <CardHeader>
              <Pen className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Intuitive Blogging</CardTitle>
            </CardHeader>
            <CardContent>
              Create beautiful, engaging content with our user-friendly
              platform.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Community Building</CardTitle>
            </CardHeader>
            <CardContent>
              Connect with your audience and grow your community with powerful
              engagement tools.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Rocket className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Growth Support</CardTitle>
            </CardHeader>
            <CardContent>
              Scale your blog with our advanced analytics and SEO optimization
              features.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <p className="text-lg text-muted-foreground mb-4">
              Founded in 2023, Skypea was born out of a passion for empowering
              voices in the digital age. Our founders, experienced bloggers
              themselves, recognized the need for a more intuitive, powerful
              blogging platform that could grow with its users.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Today, Skypea is used by thousands of bloggers worldwide, from
              hobbyists to professional content creators. We&apos;re constantly
              evolving, driven by our community&apos;s feedback and the
              ever-changing digital landscape.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Alharith Yassin",
              role: "Founder",
              image: "https://image.alhaymex.com/initials?initials=ay",
            },
          ].map((member) => (
            <Card key={member.name}>
              <CardHeader>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  unoptimized
                  className="rounded-full mx-auto mb-4"
                />
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Join the Skypea Community
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Ready to take your blogging to new heights? Start your journey with
          Skypea today!
        </p>
        <Button asChild size="lg">
          <Link href="/login">Get Started</Link>
        </Button>
      </section>
    </div>
  );
}
