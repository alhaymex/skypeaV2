"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Newsletter subscription submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          className="flex-grow"
          required
        />
        <Button type="submit">Subscribe</Button>
      </div>
      <p className="text-sm text-muted-foreground">
        By subscribing, you agree to our Privacy Policy and consent to receive
        updates from our company.
      </p>
    </form>
  );
}
