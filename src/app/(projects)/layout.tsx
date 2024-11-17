import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session || !session.user) redirect("/login");
  return children;
};

export default layout;
