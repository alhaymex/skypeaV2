import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NewProjectForm from "./NewProjectForm";

export default function NewProjectButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>New blog</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Blog</SheetTitle>
        </SheetHeader>
        <div className="p-3">
          <NewProjectForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}
