import NextAuth from "next-auth";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, users } from "@/db/schema";

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
      session.user.plan = fetchedUser[0].plan;
      return session;
    },
  },
  providers: [Google, Resend({ from: "no-reply@skypea.net" })],
});
