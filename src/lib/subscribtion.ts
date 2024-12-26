import { db } from "@/db";
import { purchases, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export type Subscription = "free" | "pro";

export const getSubscription = cache(
  async (userId: string): Promise<Subscription> => {
    try {
      // Check purchases by userId
      const subscriptionsByUser = await db
        .select()
        .from(purchases)
        .where(eq(purchases.userId, userId));

      // If no user-linked purchase found, check purchases by email
      if (!subscriptionsByUser.length) {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.id, userId))
          .limit(1);

        if (user.length && user[0]?.email) {
          const subscriptionsByEmail = await db
            .select()
            .from(purchases)
            .where(eq(purchases.email, user[0].email));

          // Link purchase to user if found by email
          if (subscriptionsByEmail.length) {
            await db
              .update(purchases)
              .set({ userId: userId })
              .where(eq(purchases.email, user[0].email));

            return "pro";
          }
        }
      }

      const subscription = subscriptionsByUser[0];
      if (
        !subscription ||
        subscription.status !== "active" ||
        subscription.cancelled ||
        (subscription.renewsAt && subscription.renewsAt < new Date())
      ) {
        return "free";
      }

      return "pro";
    } catch (error) {
      console.error("Error fetching subscription:", error);
      return "free";
    }
  }
);
