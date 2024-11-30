"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Editor } from "@/components/pages/projects/posts/Editor";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const NewPostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState(
    "<p>Start writing your blog post here...</p>"
  );
  const [distributeAsNewsletter, setDistributeAsNewsletter] = useState(false);
  const [publishOption, setPublishOption] = useState("immediately");
  const [scheduledTime, setScheduledTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the post data to your backend
      // For example: await createPost({ title, description, content, distributeAsNewsletter, publishOption, scheduledTime })
      console.log("Saving post:", {
        title,
        description,
        content,
        distributeAsNewsletter,
        publishOption,
        scheduledTime,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      //   router.push("/posts"); // Redirect to posts list after saving
    } catch (error) {
      console.error("Failed to save post:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter blog post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-2"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter a brief description of your post"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-2"
              />
            </div>
            <div>
              <Label>Content</Label>
              <Editor content={content} onChange={setContent} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="distributeAsNewsletter"
                checked={distributeAsNewsletter}
                onCheckedChange={(checked) =>
                  setDistributeAsNewsletter(checked as boolean)
                }
              />
              <Label
                htmlFor="distributeAsNewsletter"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Distribute as Newsletter
              </Label>
            </div>
            <div>
              <Label>Publish Options</Label>
              <RadioGroup
                value={publishOption}
                onValueChange={setPublishOption}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="immediately" id="immediately" />
                  <Label htmlFor="immediately">Publish Immediately</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="schedule" id="schedule" />
                  <Label htmlFor="schedule">Schedule for Later</Label>
                </div>
              </RadioGroup>
            </div>
            {publishOption === "schedule" && (
              <div>
                <Label htmlFor="scheduledTime">Scheduled Time</Label>
                <Input
                  id="scheduledTime"
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="mb-2"
                />
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Blog Post"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewPostPage;
