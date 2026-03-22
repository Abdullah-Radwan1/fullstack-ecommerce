import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function loading() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-my-main/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-my-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-8 w-32 rounded-full" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-border/40">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-28" />
                  </div>
                  <Skeleton className="w-12 h-12 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Skeleton */}
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="h-1 w-full bg-gradient-to-r from-my-main via-my-secondary to-my-main" />

          <CardContent className="p-6">
            {/* Tabs Skeleton */}
            <div className="mb-6 flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-28 rounded-md" />
              ))}
            </div>

            {/* Tab Content Skeleton */}
            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-32" />
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((row) => (
                  <div
                    key={row}
                    className="grid grid-cols-4 gap-4 items-center"
                  >
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-2 h-2 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
