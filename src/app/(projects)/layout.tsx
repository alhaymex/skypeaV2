import ProModal from "@/components/modals/ProModal";
import { Tutorial } from "@/components/tutorial/Tutorial";
import getSession from "@/lib/getSession";
import { getSubscription } from "@/lib/subscribtion";
import SubscriptionProvider from "@/providers/SubscriptionProvider";
import { TutorialProvider } from "@/providers/TutorialContext";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  const userId = session?.user?.id as string;

  if (!session || !userId) redirect("/login");

  const subscription = await getSubscription(userId);
  console.log(subscription);

  return (
    <TutorialProvider>
      <SubscriptionProvider userSubscription={subscription}>
        {children}
        <Tutorial />
        <ProModal />
      </SubscriptionProvider>
    </TutorialProvider>
  );
};

export default layout;
