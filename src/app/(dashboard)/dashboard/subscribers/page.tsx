"use client";

import { useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MoreHorizontal,
  Trash2,
  Mail,
  UserPlus,
  Download,
  Filter,
  PenSquare,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Sample data for subscribers
const subscribers = [
  {
    id: 1,
    email: "john@example.com",
    name: "John Doe",
    status: "Active",
    joinDate: "2023-05-15",
  },
  {
    id: 2,
    email: "jane@example.com",
    name: "Jane Smith",
    status: "Active",
    joinDate: "2023-05-20",
  },
  {
    id: 3,
    email: "bob@example.com",
    name: "Bob Johnson",
    status: "Inactive",
    joinDate: "2023-05-25",
  },
  {
    id: 4,
    email: "alice@example.com",
    name: "Alice Brown",
    status: "Active",
    joinDate: "2023-06-01",
  },
  {
    id: 5,
    email: "charlie@example.com",
    name: "Charlie Davis",
    status: "Active",
    joinDate: "2023-06-05",
  },
];

export default function SubscribersPage() {
  const [selectedSubscribers, setSelectedSubscribers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSubscriberSelection = (subscriberId: number) => {
    setSelectedSubscribers((prev) =>
      prev.includes(subscriberId)
        ? prev.filter((id) => id !== subscriberId)
        : [...prev, subscriberId]
    );
  };

  const isAllSelected = selectedSubscribers.length === subscribers.length;
  const toggleAllSelection = () => {
    setSelectedSubscribers(
      isAllSelected ? [] : subscribers.map((subscriber) => subscriber.id)
    );
  };

  const filteredSubscribers = subscribers.filter(
    (subscriber) =>
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Subscribers</h1>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Add Subscriber
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Subscriber</DialogTitle>
                <DialogDescription>
                  {`Enter the details of the new subscriber here. Click save when
                  you're done.`}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search subscribers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {selectedSubscribers.length} of {subscribers.length} row(s) selected.
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleAllSelection}
                  aria-label="Select all subscribers"
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedSubscribers.includes(subscriber.id)}
                    onCheckedChange={() =>
                      toggleSubscriberSelection(subscriber.id)
                    }
                    aria-label={`Select subscriber ${subscriber.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{subscriber.name}</TableCell>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>{subscriber.status}</TableCell>
                <TableCell>{subscriber.joinDate}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" /> Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <PenSquare className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
