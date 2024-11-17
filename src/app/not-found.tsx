import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CloudOff, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
      <CloudOff className="h-24 w-24 text-primary mb-8 animate-pulse" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">
        {`Oops! It seems you've ventured into uncharted waters.`}
      </p>

      <div className="mb-8">
        <Image
          src="https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif"
          alt="Confused traveler"
          width={300}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </div>

      <p className="text-lg mb-8">
        {`Don't worry, even the best explorers get lost sometimes. Let's get you
        back on track!`}
      </p>

      <div className="flex space-x-4">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
