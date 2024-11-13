import Features from "@/components/pages/home/Features";
import Hero from "@/components/pages/home/Hero";
import PricingSection from "@/components/pages/home/Pricing";
// import Testimonials from "@/components/pages/home/Testimonials";
import React from "react";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Features />
      {/* <Testimonials /> */}
      <PricingSection />
    </main>
  );
};

export default HomePage;
