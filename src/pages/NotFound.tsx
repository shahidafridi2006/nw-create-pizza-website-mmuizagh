import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Pizza } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center">
      <Pizza className="h-20 w-20 text-primary mb-6 animate-bounce" />
      <h1 className="text-4xl font-bold mb-2">404 - Slice Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Oops! The page you're looking for seems to have been eaten. Let's get you back to the menu.
      </p>
      <Link href="/">
        <Button variant="premium" size="lg">Back to Home</Button>
      </Link>
    </div>
  );
}
