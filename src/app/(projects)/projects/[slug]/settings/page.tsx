"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import FaviconUploadButton from "@/components/upload-buttons/FaviconUploadButton";
import OpenGraphUploadButton from "@/components/upload-buttons/OpenGraphUploadButton";
import { getBlogSettings } from "@/actions/uploads-actions";
import { Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type BlogSettings = {
  name: string;
  description: string | null;
  slug: string;
  favicon: string | null;
  openGraph: string | null;
};

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [blogSettings, setBlogSettings] = useState<BlogSettings | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSettings = async () => {
      const settings = await getBlogSettings("skypea-1");

      if (settings.blog && settings.blog.length > 0) {
        setBlogSettings(settings.blog[0]);
        setLoading(false);
        console.log(settings.blog[0]);
      } else {
        setBlogSettings(null);
      }
    };

    getSettings();
  }, []);

  if (loading)
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <Skeleton className="h-8 w-[200px]" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-[300px]" />
          <div className="space-y-4">
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                {`Manage your blog's general settings and preferences.`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="blog-name">Blog Name</Label>
                <Input
                  id="blog-name"
                  placeholder="My Awesome Blog"
                  value={blogSettings?.name && blogSettings.name}
                  disabled
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="blog-description">Blog Description</Label>
                <Textarea
                  id="blog-description"
                  placeholder="A blog about awesome things"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="time-zone">Time Zone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="time-zone">
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time (ET)</SelectItem>
                    <SelectItem value="cst">Central Time (CT)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                    <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="custom-domain">Domain</Label>
                </div>
                <div className="flex space-x-2">
                  <Input
                    id="custom-domain"
                    placeholder={blogSettings?.slug + ".skypea.net"}
                    disabled
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Upgrade to premium to use a custom domain.
                </p>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>
                {`Manage your blog's visual identity.`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="favicon-upload">Upload favicon icon</Label>
                <div className="flex items-center space-x-2">
                  <FaviconUploadButton
                    blogSlug={blogSettings?.slug as string}
                    blogFavicon={blogSettings?.favicon as string}
                    blogName={blogSettings?.name as string}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="opengraph-upload">OpenGraph Image</Label>
                <div className="flex items-center space-x-2">
                  <OpenGraphUploadButton
                    blogSlug={blogSettings?.slug as string}
                    blogOpenGraph={blogSettings?.openGraph as string}
                    blogName={blogSettings?.name as string}
                    blogDescription={blogSettings?.description as string}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="email-notifications"
                  className="flex flex-col space-y-1"
                >
                  <span>Email Notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive notifications via email
                  </span>
                </Label>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="marketing-emails"
                  className="flex flex-col space-y-1"
                >
                  <span>Marketing Emails</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive emails about new features and promotions
                  </span>
                </Label>
                <Switch
                  id="marketing-emails"
                  checked={marketingEmails}
                  onCheckedChange={setMarketingEmails}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
