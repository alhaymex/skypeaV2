import Footer from "@/components/pages/home/Footer";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default layout;
