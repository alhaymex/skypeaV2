import { Tutorial } from "@/components/tutorial/Tutorial";
import getSession from "@/lib/getSession";
import { TutorialProvider } from "@/providers/TutorialContext";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session || !session.user) redirect("/login");
  return (
    <TutorialProvider>
      {children}
      <Tutorial />
    </TutorialProvider>
  );
};

export default layout;
