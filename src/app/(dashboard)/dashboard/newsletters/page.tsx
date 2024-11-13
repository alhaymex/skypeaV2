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
  PlusCircle,
  Send,
  Eye,
  Edit,
  Trash2,
  BarChart2,
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
import { Textarea } from "@/components/ui/textarea";

// Sample data for newsletters
const newsletters = [
  {
    id: 1,
    title: "May Update",
    status: "Sent",
    sentDate: "2023-05-15",
    openRate: "45%",
    clickRate: "12%",
  },
  {
    id: 2,
    title: "June Newsletter",
    status: "Draft",
    sentDate: "-",
    openRate: "-",
    clickRate: "-",
  },
  {
    id: 3,
    title: "Summer Sale Announcement",
    status: "Scheduled",
    sentDate: "2023-06-30",
    openRate: "-",
    clickRate: "-",
  },
  {
    id: 4,
    title: "Weekly Digest",
    status: "Sent",
    sentDate: "2023-06-07",
    openRate: "38%",
    clickRate: "9%",
  },
  {
    id: 5,
    title: "Product Launch",
    status: "Draft",
    sentDate: "-",
    openRate: "-",
    clickRate: "-",
  },
];

export default function NewsletterPage() {
  const [selectedNewsletters, setSelectedNewsletters] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleNewsletterSelection = (newsletterId: number) => {
    setSelectedNewsletters((prev) =>
      prev.includes(newsletterId)
        ? prev.filter((id) => id !== newsletterId)
        : [...prev, newsletterId]
    );
  };

  const isAllSelected = selectedNewsletters.length === newsletters.length;
  const toggleAllSelection = () => {
    setSelectedNewsletters(
      isAllSelected ? [] : newsletters.map((newsletter) => newsletter.id)
    );
  };

  const filteredNewsletters = newsletters.filter((newsletter) =>
    newsletter.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Newsletter</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Newsletter
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Create New Newsletter</DialogTitle>
              <DialogDescription>
                Compose your newsletter here. You can save it as a draft or send
                it immediately.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  className="col-span-3"
                  placeholder="Enter newsletter title"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="content"
                  className="col-span-3"
                  placeholder="Compose your newsletter content"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Save as Draft</Button>
              <Button>Send Newsletter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search newsletters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {selectedNewsletters.length} of {newsletters.length} row(s) selected.
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
                  aria-label="Select all newsletters"
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent Date</TableHead>
              <TableHead>Open Rate</TableHead>
              <TableHead>Click Rate</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNewsletters.map((newsletter) => (
              <TableRow key={newsletter.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedNewsletters.includes(newsletter.id)}
                    onCheckedChange={() =>
                      toggleNewsletterSelection(newsletter.id)
                    }
                    aria-label={`Select newsletter ${newsletter.title}`}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {newsletter.title}
                </TableCell>
                <TableCell>{newsletter.status}</TableCell>
                <TableCell>{newsletter.sentDate}</TableCell>
                <TableCell>{newsletter.openRate}</TableCell>
                <TableCell>{newsletter.clickRate}</TableCell>
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
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" /> Send
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart2 className="mr-2 h-4 w-4" /> Analytics
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
