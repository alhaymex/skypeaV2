"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, FileText, TrendingUp, Mail } from "lucide-react";
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
import { getBlogAnalytics } from "@/actions/blogs-actions";
import { useParams } from "next/navigation";

interface BlogAnalytics {
  id: string;
  blogSlug: string;
  totalSubscribers: number | null;
  publishedPosts: number | null;
  totalViews: number | null;
  newslettersSent: number | null;
  lastSubscriberAddedAt: Date | null;
  lastNewsletterSentAt: Date | null;
  dailyViewsHistory: Array<{ date: string; views: number }>;
  subscriberGrowthHistory: Array<{ date: string; subscribers: number }>;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export default function DashboardPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [analytics, setAnalytics] = useState<BlogAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const data = await getBlogAnalytics(slug);
        setAnalytics(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [slug]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error)
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (!analytics)
    return <div className="p-8 text-center">No data available</div>;

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
              <div className="text-2xl font-bold">
                {analytics.totalSubscribers ?? "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                Last added:{" "}
                {analytics.lastSubscriberAddedAt
                  ? new Date(
                      analytics.lastSubscriberAddedAt
                    ).toLocaleDateString()
                  : "N/A"}
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
              <div className="text-2xl font-bold">
                {analytics.publishedPosts ?? "N/A"}
              </div>
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
              <div className="text-2xl font-bold">
                {analytics.totalViews ?? "N/A"}
              </div>
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
              <div className="text-2xl font-bold">
                {analytics.newslettersSent ?? "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                Last sent:{" "}
                {analytics.lastNewsletterSentAt
                  ? new Date(
                      analytics.lastNewsletterSentAt
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-full lg:col-span-4">
            <CardHeader>
              <CardTitle>Page Views History</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  views: {
                    label: "Page Views",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[150px] sm:h-[200px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={analytics.dailyViewsHistory}
                    margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="date"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        new Date(value).toLocaleDateString()
                      }
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="views"
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
              <CardTitle>Subscriber Growth</CardTitle>
              <CardDescription>Subscriber count over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  subscribers: {
                    label: "Subscribers",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[150px] sm:h-[200px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analytics.subscriberGrowthHistory}
                    margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="date"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        new Date(value).toLocaleDateString()
                      }
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="subscribers"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
