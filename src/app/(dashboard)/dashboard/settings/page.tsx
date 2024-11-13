"use client";

import { useState } from "react";
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
// import { AlertCircle } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false); // This would typically come from your auth system

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your blog's general settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="blog-name">Blog Name</Label>
                <Input id="blog-name" placeholder="My Awesome Blog" />
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
                  <Label htmlFor="custom-domain">Custom Domain</Label>
                  {isPremiumUser && <Badge variant="secondary">Premium</Badge>}
                </div>
                <div className="flex space-x-2">
                  <Input
                    id="custom-domain"
                    placeholder={isPremiumUser ? "yourdomain.com" : "subdomain"}
                    disabled={!isPremiumUser}
                  />
                  {isPremiumUser ? (
                    <Button>Verify</Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setIsPremiumUser(true)}
                    >
                      Upgrade
                    </Button>
                  )}
                </div>
                {!isPremiumUser && (
                  <p className="text-sm text-muted-foreground">
                    Upgrade to premium to use a custom domain.
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account details and password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="display-name">Display Name</Label>
                <Input id="display-name" placeholder="John Doe" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Account</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Account Type</CardTitle>
              <CardDescription>
                Manage your account subscription.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <p className="font-medium">Current Plan</p>
                  <p className="text-sm text-muted-foreground">
                    {isPremiumUser ? "Premium" : "Free"}
                  </p>
                </div>
                {isPremiumUser ? (
                  <Button
                    variant="outline"
                    onClick={() => setIsPremiumUser(false)}
                  >
                    Downgrade to Free
                  </Button>
                ) : (
                  <Button onClick={() => setIsPremiumUser(true)}>
                    Upgrade to Premium
                  </Button>
                )}
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
