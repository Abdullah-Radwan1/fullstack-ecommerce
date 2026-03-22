import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-my-main/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-my-secondary/5 rounded-full blur-3xl" />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumb Skeleton */}
        <div className="mb-8 flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left: Image & Features */}
          <div className="flex flex-col space-y-6 h-full">
            {/* Image Card */}
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden flex-1">
              <div className="h-1 w-full bg-gradient-to-r from-my-main via-my-secondary to-my-main" />
              <CardContent className="p-8 flex items-center justify-center">
                <Skeleton className="aspect-square w-full max-w-lg rounded-lg" />
              </CardContent>
            </Card>

            {/* Features Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="border-border/30 bg-card/30 p-4">
                  <Skeleton className="w-6 h-6 mx-auto mb-2" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Details & Actions */}
          <div className="flex flex-col space-y-8 h-full">
            {/* Title & Rating */}
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="w-5 h-5 rounded-full" />
                  ))}
                </div>
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <Skeleton className="h-7 w-40" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            <Separator className="bg-border/40" />

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>

            {/* Specifications Card */}
            <Card className="border-border/40 bg-card/30 mt-auto">
              <CardContent className="p-6">
                <Skeleton className="h-7 w-40 mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item}>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Skeleton className="w-2 h-8 rounded-full" />
              <Skeleton className="h-7 w-48" />
            </div>
            <Skeleton className="h-5 w-20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card
                key={i}
                className="bg-card/50 border-border/40 rounded-xl overflow-hidden"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <div className="flex gap-3 pt-2">
                    <Skeleton className="h-10 flex-1 rounded-lg" />
                    <Skeleton className="h-10 w-10 rounded-lg" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
