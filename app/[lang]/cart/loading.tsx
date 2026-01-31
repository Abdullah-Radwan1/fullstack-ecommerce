import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Skeleton className="w-40 h-10" />
            <Skeleton className="w-60 h-4 mt-2" />
          </div>
          <Skeleton className="w-32 h-10" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart table skeleton */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="w-48 h-8" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-full h-24" />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Summary skeleton */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <Skeleton className="w-40 h-8" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-12" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
