"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";

const page = () => {
  const handleBuy = async () => {
    const response = await axios.post("/api/purchase", {
      productId: "622484",
    });

    console.log(response.data);

    window.open(response.data.checkoutUrl, "_blank");
  };

  return (
    <div>
      <Button onClick={handleBuy}>Buy</Button>
    </div>
  );
};

export default page;
