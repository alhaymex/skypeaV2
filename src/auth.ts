import NextAuth from "next-auth";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, purchases, users } from "@/db/schema";

import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session, user }) {
      const fetchedUser = await db
        .select()
        .from(users)
        .where(eq(users.id, user.id));

      if (session.user?.email) {
        await db
          .update(purchases)
          .set({
            userId: user.id,
            updatedAt: new Date(),
          })
          .where(eq(purchases.email, session.user.email));

        const userPurchases = await db
          .select()
          .from(purchases)
          .where(eq(purchases.email, session.user.email));

        if (userPurchases.length > 0) {
          const latestPurchase = userPurchases[0];
          if (latestPurchase.status === "paid") {
            if (fetchedUser[0].plan !== "pro") {
              await db
                .update(users)
                .set({ plan: "pro" })
                .where(eq(users.id, user.id));

              fetchedUser[0].plan = "pro";
            }
          }
        }
      }

      session.user.plan = fetchedUser[0].plan;
      return session;
    },
  },
  providers: [Google, Resend({ from: "no-reply@skypea.net" })],
});
