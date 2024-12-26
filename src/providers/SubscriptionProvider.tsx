"use client";

import { Subscription } from "@/lib/subscribtion";
import { createContext, useContext } from "react";

const SubscriptionContext = createContext<Subscription | undefined>(undefined);

interface SubscriptionProviderProps {
  children: React.ReactNode;
  userSubscription: Subscription;
}

export default function SubscriptionProvider({
  children,
  userSubscription,
}: SubscriptionProviderProps) {
  return (
    <SubscriptionContext.Provider value={userSubscription}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);

  if (context === undefined) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
}
