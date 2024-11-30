import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import type { AdapterAccountType } from "next-auth/adapters";

const pool = postgres(process.env.DATABASE_URL as string, { max: 1 });

export const db = drizzle(pool);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  fullname: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  bio: text("bio"),

  createdAt: timestamp("createdAt", { mode: "date" }),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const blogs = pgTable("blog", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name"),
  description: text("description"),
  slug: text("slug").notNull().unique(),
  icon: text("icon"),
  isLive: boolean("isLive").default(false),
  isPinned: boolean("isPinned").default(false),

  backgroundColor: text("backgroundColor").notNull().default("#ffffff"),
  fontFamily: text("fontFamily").notNull().default("sans-serif"),

  createdAt: timestamp("createdAt", { mode: "date" }),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const blogComponents = pgTable("blog_component", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  blogId: text("blogId")
    .notNull()
    .references(() => blogs.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  order: integer("order").notNull(),
  data: jsonb("data").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const blogAnalytics = pgTable("blog_analytics", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  blogSlug: text("blogSlug")
    .notNull()
    .references(() => blogs.slug, { onDelete: "cascade" }),

  // Tracking key metrics
  totalSubscribers: integer("totalSubscribers").default(0),
  publishedPosts: integer("publishedPosts").default(0),
  totalViews: integer("totalViews").default(0),
  newslettersSent: integer("newslettersSent").default(0),

  // Detailed analytics tracking
  lastSubscriberAddedAt: timestamp("lastSubscriberAddedAt", { mode: "date" }),
  lastNewsletterSentAt: timestamp("lastNewsletterSentAt", { mode: "date" }),

  // Optional: Daily or periodic aggregation
  dailyViewsHistory: text("dailyViewsHistory"), // Could store JSON of view counts
  subscriberGrowthHistory: text("subscriberGrowthHistory"), // Could store JSON of subscriber counts

  createdAt: timestamp("createdAt", { mode: "date" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: timestamp("updatedAt", { mode: "date" }).$defaultFn(
    () => new Date()
  ),
});

export const posts = pgTable("posts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  blogSlug: text("blogSlug")
    .notNull()
    .references(() => blogs.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  content: text("content").notNull(),
  publishOption: text("publishOption", {
    enum: ["draft", "published", "scheduled"],
  })
    .notNull()
    .default("draft"),
  scheduledTime: timestamp("scheduledTime", { mode: "date" }),
  isDistributed: boolean("isDistributed").default(false),
  status: text("status", { enum: ["draft", "published", "archived"] })
    .notNull()
    .default("draft"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export type BlogAnalytics = typeof blogAnalytics.$inferSelect;
export type NewBlogAnalytics = typeof blogAnalytics.$inferInsert;
