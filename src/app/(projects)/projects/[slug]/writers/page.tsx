"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  PlusCircle,
  Trash2,
  UserPlus,
  Mail,
  Calendar,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import WriterAvatarUploadButton from "@/components/upload-buttons/WriterAvararUploadButton";
import { addWriter, getWriters } from "@/actions/posts-actions";
import { useParams } from "next/navigation";
import { Writer, NewWriterForm } from "@/types/writer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const WritersPage = () => {
  const params = useParams();
  const blogSlug = params.slug as string;

  const [writers, setWriters] = useState<Writer[]>([]);
  const [newWriter, setNewWriter] = useState<NewWriterForm>({
    id: "",
    fullName: "",
    avatar: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const loadWriters = async () => {
      const result = await getWriters({ blogSlug });

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      if (result.data) {
        setWriters(result.data);
      }
    };

    loadWriters();
  }, [blogSlug, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewWriter((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddWriter = async () => {
    if (newWriter.fullName && newWriter.avatar) {
      const result = await addWriter({
        blogSlug: blogSlug,
        name: newWriter.fullName,
        avatar: newWriter.avatar,
      });

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      const transformedWriter: Writer = {
        id: result.data?.id || "",
        fullName: result.data?.name || "",
        avatar: result.data?.avatar || "",
        blogSlug: result.data?.blogSlug || "",
        createdAt: new Date(result.data?.createdAt || ""),
        updatedAt: new Date(result.data?.updatedAt || ""),
      };

      setWriters((prev) => [...prev, transformedWriter]);
      setNewWriter({ id: "", fullName: "", avatar: "" });
      toast({
        title: "Writer Added",
        description: `${newWriter.fullName} has been added to the writers list.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Please provide both full name and avatar for the writer.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteWriter = (id: string) => {
    setWriters((prev) => prev.filter((writer) => writer.id !== id));
    toast({
      title: "Writer Removed",
      description: "The writer has been removed from the list.",
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Writers</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Add New Writer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={newWriter.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter writer's full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="avatar">Avatar</Label>
                <WriterAvatarUploadButton
                  setWriters={setWriters}
                  writer={newWriter}
                  setWriter={setNewWriter}
                />
              </div>
              {newWriter.avatar && (
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src={newWriter.avatar}
                    alt="New writer avatar"
                    width={128}
                    height={128}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddWriter} className="w-full">
              <UserPlus className="mr-2 h-4 w-4" /> Add Writer
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>All Writers</CardTitle>
          </CardHeader>
          <CardContent>
            {writers.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No writers added yet.
              </p>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                {writers.map((writer, index) => (
                  <React.Fragment key={writer.id}>
                    <div className="flex items-center space-x-4 py-4">
                      <Image
                        src={writer.avatar as string}
                        alt={`${writer.fullName}'s avatar`}
                        width={64}
                        height={64}
                        className="rounded-full object-cover"
                      />
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold">{writer.fullName}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          Joined {writer.createdAt.toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteWriter(writer.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    {index < writers.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WritersPage;
