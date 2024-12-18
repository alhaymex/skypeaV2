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

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
};

const DUMMY_DATA: Message[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    message:
      "Hello, I'm interested in your services. Can you provide more information?",
    createdAt: new Date("2023-06-15T10:30:00"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    message:
      "I have a question about your pricing. Is there a discount for annual subscriptions?",
    createdAt: new Date("2023-06-14T15:45:00"),
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    message:
      "Your product looks great! I'd like to schedule a demo if possible.",
    createdAt: new Date("2023-06-13T09:15:00"),
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    message:
      "I'm having trouble with my account. Can someone from support contact me?",
    createdAt: new Date("2023-06-12T14:20:00"),
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    message:
      "Just wanted to say that I love your product! Keep up the great work!",
    createdAt: new Date("2023-06-11T11:00:00"),
  },
];

export default function MessagesPage() {
  const { toast } = useToast();

  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setMessages(DUMMY_DATA);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="font-medium">{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>
                    {new Date(message.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">View message</span>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Message Details</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>
                            <h3 className="font-semibold">Name</h3>
                            <p>{message.name}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Email</h3>
                            <p>{message.email}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Message</h3>
                            <p>{message.message}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Date</h3>
                            <p>
                              {new Date(message.createdAt).toLocaleString()}
                            </p>
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
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-[150px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[200px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-8 w-8 rounded-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
