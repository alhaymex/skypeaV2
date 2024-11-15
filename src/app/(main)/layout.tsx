import Navbar from "@/components/common/Navbar";
import Footer from "@/components/pages/home/Footer";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default layout;
