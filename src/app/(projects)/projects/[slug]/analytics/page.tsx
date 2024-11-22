"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for charts
const pageViewsData = [
  { name: "Jan", views: 4000 },
  { name: "Feb", views: 3000 },
  { name: "Mar", views: 5000 },
  { name: "Apr", views: 4500 },
  { name: "May", views: 6000 },
  { name: "Jun", views: 5500 },
];

const blogPostPerformanceData = [
  { name: "Post 1", views: 4000, shares: 2400 },
  { name: "Post 2", views: 3000, shares: 1398 },
  { name: "Post 3", views: 2000, shares: 9800 },
  { name: "Post 4", views: 2780, shares: 3908 },
  { name: "Post 5", views: 1890, shares: 4800 },
];

const newsletterPerformanceData = [
  { name: "Week 1", subscribers: 4000, openRate: 80 },
  { name: "Week 2", subscribers: 4200, openRate: 75 },
  { name: "Week 3", subscribers: 4500, openRate: 78 },
  { name: "Week 4", subscribers: 4800, openRate: 82 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");
  console.log(timeRange);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex items-center space-x-2">
          <Select
            defaultValue="7d"
            onValueChange={(value) => setTimeRange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button>Download Report</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Page Views
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">246,837</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Newsletter Subscribers
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Read Time
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3m 24s</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Bounce Rate
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32.1%</div>
                <p className="text-xs text-muted-foreground">
                  -4% from last period
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Page Views Over Time</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    views: {
                      label: "Page Views",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={pageViewsData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="views"
                        stroke="var(--color-views)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Posts</CardTitle>
                <CardDescription>
                  Your most viewed blog posts this period.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TopPosts />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="blog" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Blog Post Performance</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    views: {
                      label: "Views",
                      color: "hsl(var(--chart-1))",
                    },
                    shares: {
                      label: "Shares",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={blogPostPerformanceData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="views" fill="var(--color-views)" />
                      <Bar dataKey="shares" fill="var(--color-shares)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
                <CardDescription>
                  Most viewed blog categories this period.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PopularCategories />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="newsletter" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Newsletter Performance</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    subscribers: {
                      label: "Subscribers",
                      color: "hsl(var(--chart-1))",
                    },
                    openRate: {
                      label: "Open Rate",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={newsletterPerformanceData}>
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="subscribers"
                        stroke="var(--color-subscribers)"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="openRate"
                        stroke="var(--color-openRate)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Performing Emails</CardTitle>
                <CardDescription>
                  Newsletters with highest open rates this period.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TopEmails />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TopPosts() {
  return (
    <div className="space-y-8">
      {[
        { title: "10 Tips for Better Writing", views: 15234 },
        { title: "The Future of AI in Content Creation", views: 12109 },
        { title: "How to Build a Successful Blog", views: 10876 },
        { title: "SEO Strategies for 2023", views: 9654 },
        { title: "The Art of Storytelling in Marketing", views: 8765 },
      ].map((post, i) => (
        <div key={i} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{post.title}</p>
            <p className="text-sm text-muted-foreground">
              {post.views.toLocaleString()} views
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PopularCategories() {
  return (
    <div className="space-y-8">
      {[
        { name: "Technology", percentage: 35 },
        { name: "Marketing", percentage: 28 },
        { name: "Business", percentage: 20 },
        { name: "Lifestyle", percentage: 12 },
        { name: "Health", percentage: 5 },
      ].map((category, i) => (
        <div key={i} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{category.name}</p>
            <p className="text-sm text-muted-foreground">
              {category.percentage}% of total views
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TopEmails() {
  return (
    <div className="space-y-8">
      {[
        { subject: "May Newsletter: Exclusive Content Inside", openRate: 68 },
        { subject: "Breaking: New Feature Announcement", openRate: 65 },
        { subject: "Your Weekly Digest of Top Stories", openRate: 62 },
        { subject: "Limited Time Offer: 50% Off Premium", openRate: 59 },
        { subject: "Expert Interview: Future of Blogging", openRate: 57 },
      ].map((email, i) => (
        <div key={i} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{email.subject}</p>
            <p className="text-sm text-muted-foreground">
              {email.openRate}% open rate
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
