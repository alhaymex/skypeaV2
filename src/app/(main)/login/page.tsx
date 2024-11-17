import LoginPage from "@/components/pages/login/LoginForm";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Login to Skypea",
  description: "Login to Skypea",
};

const page = async () => {
  const session = await getSession();

  if (session) redirect("/projects");

  return (
    <main>
      <LoginPage />
    </main>
  );
};

export default page;
