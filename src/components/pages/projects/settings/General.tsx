"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateBlogGeneralSettings } from "@/actions/settings-actions";
import { Loader } from "lucide-react";
import { BlogSettings } from "@/app/(projects)/projects/[slug]/settings/page";

const formSchema = z.object({
  blogName: z.string().min(2, {
    message: "Blog name must be at least 2 characters.",
  }),
  blogDescription: z.string().optional(),
  domain: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type Settings = {
  description?: string;
};

type Props = {
  blogName: string;
  blogDescription: string;
  domain: string;
  blogSlug: string;
  setBlogSettings: (settings: BlogSettings) => void;
};

const GeneralSettings = ({
  blogName,
  blogDescription,
  domain,
  blogSlug,
  setBlogSettings,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blogName,
      blogDescription,
      domain,
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    await updateBlogGeneralSettings(
      blogSlug,
      values.blogDescription as string
    ).then((res) => {
      console.log(res.data);
      setBlogSettings({
        name: res?.data?.name as string,
        slug: res?.data?.slug as string,
        favicon: res?.data?.favicon as string,
        openGraph: res?.data?.openGraph as string,
        description: res?.data?.description as string,
      });
      setLoading(false);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          {`Manage your blog's general settings and preferences.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="blogName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Blog" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blogDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A blog about awesome things"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="timeZone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Zone</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a timezone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      <SelectItem value="cst">Central Time (CT)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`${blogSlug}.skypea.net`}
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormDescription>
                    Upgrade to premium to use a custom domain.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
