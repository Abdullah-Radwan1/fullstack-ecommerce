import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import "./globals.css";
export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/40 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-12 pb-8 px-8 text-center">
          {/* Error Number */}
          <div className="mb-6">
            <span className="text-8xl font-bold bg-gradient-to-b from-my-main to-my-secondary bg-clip-text text-transparent">
              404
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold mb-3 text-foreground">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="text-muted-foreground mb-8">
            Could not find the requested resource
          </p>

          {/* Home Button */}
          <Button
            asChild
            className="bg-my-main hover:bg-my-secondary text-background font-medium transition-all duration-300 hover:scale-105"
          >
            <Link href="/en">Return Home</Link>
          </Button>

          {/* Decorative Elements */}
          <div className="mt-10 space-y-2">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
            <p className="text-xs text-muted-foreground">
              Or try navigating using the menu
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
