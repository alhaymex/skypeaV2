import Navbar from "@/components/common/Navbar";
import SmoothScroll from "@/components/common/SmoothScroll";
import Footer from "@/components/pages/home/Footer";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <SmoothScroll />

      {children}
      <Footer />
    </>
  );
};

export default layout;
