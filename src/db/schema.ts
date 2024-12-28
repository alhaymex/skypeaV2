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
import { relations } from "drizzle-orm";

const pool = postgres(process.env.DATABASE_URL as string, { max: 1 });

export const db = drizzle(pool);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  fullname: text("fullname"),
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
  name: text("name").notNull(),
  description: text("description"),
  slug: text("slug").notNull().unique(),
  icon: text("icon"),
  favicon: text("favicon"),
  openGraph: text("openGraph"),
  isLive: boolean("isLive").default(false),
  isPinned: boolean("isPinned").default(false),
  backgroundColor: text("backgroundColor").notNull().default("#ffffff"),
  fontFamily: text("fontFamily").notNull().default("sans-serif"),
  createdAt: timestamp("createdAt", { mode: "date" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: timestamp("updatedAt", { mode: "date" }).$defaultFn(
    () => new Date()
  ),
});

export const blogRelations = relations(blogs, ({ many }) => ({
  pages: many(blogPages),
}));

export const blogPages = pgTable("blog_page", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  blogId: text("blogId")
    .notNull()
    .references(() => blogs.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  order: integer("order").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: timestamp("updatedAt", { mode: "date" }).$defaultFn(
    () => new Date()
  ),
});

export const blogPageRelations = relations(blogPages, ({ one, many }) => ({
  blog: one(blogs, {
    fields: [blogPages.blogId],
    references: [blogs.id],
  }),
  components: many(blogComponents),
}));

export const blogComponents = pgTable("blog_component", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  pageId: text("pageId")
    .notNull()
    .references(() => blogPages.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  order: integer("order").notNull(),
  data: jsonb("data").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: timestamp("updatedAt", { mode: "date" }).$defaultFn(
    () => new Date()
  ),
});

export const blogComponentRelations = relations(blogComponents, ({ one }) => ({
  page: one(blogPages, {
    fields: [blogComponents.pageId],
    references: [blogPages.id],
  }),
}));

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
    .references(() => blogs.slug, { onDelete: "cascade" }),
  title: text("title").notNull(),
  image: text("image").$default(
    () =>
      "https://image.alhaymex.com/placeholder?shape=grid&width=1200&height=630"
  ),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  content: text("content").notNull(),
  isNewsletter: boolean("isNewsletter").default(false),
  writers: text("writers").array(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const writers = pgTable("writers", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  blogSlug: text("blogSlug")
    .notNull()
    .references(() => blogs.slug, { onDelete: "cascade" }),
  name: text("name").notNull(),
  avatar: text("avatar"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const postViews = pgTable("post_views", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  postId: text("postId")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  viewCount: integer("viewCount").default(0),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const postWriters = pgTable("post_writers", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  postId: text("postId")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  writerId: text("writerId")
    .notNull()
    .references(() => writers.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

// Messages table to store form submissions
export const messages = pgTable("messages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  blogSlug: text("blogSlug")
    .notNull()
    .references(() => blogs.slug, { onDelete: "cascade" }),
  formData: jsonb("formData")
    .notNull()
    .$type<Record<string, { value: string | boolean; label: string }>>(),
  status: text("status").notNull().default("unread"),
  createdAt: timestamp("createdAt", { mode: "date" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: timestamp("updatedAt", { mode: "date" }).$defaultFn(
    () => new Date()
  ),
});

export const messageRelations = relations(messages, ({ one }) => ({
  blog: one(blogs, {
    fields: [messages.blogSlug],
    references: [blogs.slug],
  }),
}));

export const purchases = pgTable("purchases", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  status: text("status").notNull(),
  renewsAt: timestamp("renewsAt"),
  endsAt: timestamp("endsAt"),
  cancelled: boolean("cancelled").notNull().default(false),
  createdAt: timestamp("createdAt", { mode: "date" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: timestamp("updatedAt", { mode: "date" }).$defaultFn(
    () => new Date()
  ),
});

export const subscribers = pgTable("subscribers", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  blogSlug: text("blogSlug")
    .notNull()
    .references(() => blogs.slug, { onDelete: "cascade" }),
  status: text("status").notNull().default("subscribed"),
  createdAt: timestamp("createdAt", { mode: "date" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: timestamp("updatedAt", { mode: "date" }).$defaultFn(
    () => new Date()
  ),
});

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type BlogAnalytics = typeof blogAnalytics.$inferSelect;
export type NewBlogAnalytics = typeof blogAnalytics.$inferInsert;
