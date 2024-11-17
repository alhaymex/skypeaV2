"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, Users, FileText, TrendingUp, Mail } from "lucide-react";
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

const pageViews = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 2100 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 2400 },
  { name: "May", total: 2800 },
  { name: "Jun", total: 3200 },
  { name: "Jul", total: 3800 },
];

const topPosts = [
  { name: "10 Productivity Tips", views: 2800 },
  { name: "Future of AI", views: 2200 },
  { name: "Learn React in 30 Days", views: 1800 },
  { name: "Best Coding Practices", views: 1600 },
  { name: "Mastering TypeScript", views: 1400 },
];

const recentPosts = [
  {
    title: "Boost Your Productivity with These 5 Tips",
    excerpt:
      "Learn how to maximize your efficiency and get more done in less time.",
    date: "2 days ago",
  },
  {
    title: "The Future of AI in Content Creation",
    excerpt:
      "Explore how artificial intelligence is revolutionizing the way we create and consume content.",
    date: "4 days ago",
  },
  {
    title: "10 Must-Read Books for Aspiring Entrepreneurs",
    excerpt:
      "Discover the essential reads that can help you on your entrepreneurial journey.",
    date: "1 week ago",
  },
];

const upcomingNewsletters = [
  {
    title: "Weekly Tech Roundup",
    scheduledDate: "Monday, 10:00 AM",
  },
  {
    title: "Monthly Subscriber Exclusive",
    scheduledDate: "Wednesday, 2:00 PM",
  },
  {
    title: "Breaking News Alert",
    scheduledDate: "Friday, 9:00 AM",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Subscribers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">
                +180 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Published Posts
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">
                +6 in the last 7 days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Page Views
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124,566</div>
              <p className="text-xs text-muted-foreground">
                +14% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Newsletters Sent
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                3 scheduled for next week
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-full lg:col-span-4">
            <CardHeader>
              <CardTitle>Page Views</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  total: {
                    label: "Page Views",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[150px] sm:h-[200px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={pageViews}
                    margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => value.substring(0, 3)}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                      ticks={[0, 1000, 2000, 3000, 4000]}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="col-span-full lg:col-span-3">
            <CardHeader>
              <CardTitle>Top Posts by Views</CardTitle>
              <CardDescription>
                Your most popular content this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  views: {
                    label: "Views",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[150px] sm:h-[200px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topPosts}
                    margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => value.split(" ")[0]}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                      ticks={[0, 1000, 2000, 3000, 4000]}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="views"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-full lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentPosts.map((post, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {post.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:ml-auto font-medium">
                      {post.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-full lg:col-span-3">
            <CardHeader>
              <CardTitle>Upcoming Newsletters</CardTitle>
              <CardDescription>
                You have 3 newsletters scheduled for the next 7 days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {upcomingNewsletters.map((newsletter, index) => (
                  <div key={index} className="flex items-center">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {newsletter.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {newsletter.scheduledDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
