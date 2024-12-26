"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";

const page = () => {
  const handleBuy = async () => {
    const response = await axios.post("/api/purchase", {
      productId: "640092",
    });

    window.open(response.data.checkoutUrl, "_blank");
  };

  return (
    <div>
      <Button onClick={handleBuy}>Buy</Button>
    </div>
  );
};

export default page;
