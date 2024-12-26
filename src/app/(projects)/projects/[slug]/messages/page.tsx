"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { getMessages } from "@/actions/form-actions";
import { InferModel } from "drizzle-orm";
import { messages } from "@/db/schema";
import { useParams } from "next/navigation";

type Message = {
  id: string;
  blogSlug: string;
  formData: Record<string, { value: string | boolean; label: string }>;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function MessagesPage() {
  const { toast } = useToast();
  const { slug } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const result = await getMessages(slug as string);
        if (!result.success || !result.data) {
          throw new Error(result.error || "Failed to fetch messages");
        }

        const formattedMessages = result.data.map((msg) => ({
          ...msg,
          createdAt: msg.createdAt?.toISOString() ?? "",
          updatedAt: msg.updatedAt?.toISOString() ?? "",
        }));

        setMessages(formattedMessages);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch messages"
        );
        toast({
          title: "Error",
          description: "Failed to load messages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [slug, toast]);

  const filteredMessages = messages.filter((message) => {
    const searchLower = searchQuery.toLowerCase();
    return Object.values(message.formData).some((field) => {
      if (typeof field.value === "string") {
        return field.value.toLowerCase().includes(searchLower);
      }
      return false;
    });
  });

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Messages for {slug}</h1>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <Input
          placeholder="Search messages..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {isLoading ? (
        <MessagesTableSkeleton />
      ) : error ? (
        <div className="text-center text-red-500 mt-4">{error}</div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Form Fields</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="font-medium">
                    {/* Display first few form fields as preview */}
                    {Object.entries(message.formData)
                      .slice(0, 2)
                      .map(([_, field]) => (
                        <div key={field.label} className="truncate">
                          {field.label}: {field.value.toString()}
                        </div>
                      ))}
                    {Object.keys(message.formData).length > 2 && (
                      <span className="text-sm text-gray-500">
                        +{Object.keys(message.formData).length - 2} more fields
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        message.status === "unread"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {message.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(message.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">View message</span>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Message Details</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            {Object.entries(message.formData).map(
                              ([key, field]) => (
                                <div key={key} className="border-b pb-2">
                                  <h3 className="font-semibold text-sm text-gray-500">
                                    {field.label}
                                  </h3>
                                  <p className="mt-1">
                                    {typeof field.value === "boolean"
                                      ? field.value
                                        ? "Yes"
                                        : "No"
                                      : field.value}
                                  </p>
                                </div>
                              )
                            )}
                            <div className="border-b pb-2">
                              <h3 className="font-semibold text-sm text-gray-500">
                                Status
                              </h3>
                              <p className="mt-1 capitalize">
                                {message.status}
                              </p>
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm text-gray-500">
                                Submitted
                              </h3>
                              <p className="mt-1">
                                {formatDate(message.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredMessages.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              No messages found.
            </div>
          )}
        </>
      )}
    </div>
  );
}

const MessagesTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Form Fields</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-[250px] mb-2" />
              <Skeleton className="h-4 w-[200px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-8 w-8 rounded-full ml-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
