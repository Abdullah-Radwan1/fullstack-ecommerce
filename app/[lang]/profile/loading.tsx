import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background pt-6 pb-20 px-4">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-my-main/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-my-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Header Card */}
        <Card className="relative overflow-hidden border-border/40">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-my-main to-transparent" />
          <CardContent className="pt-8 pb-6">
            {/* Profile Image */}
            <div className="relative mx-auto w-40 h-40">
              <Skeleton className="w-full h-full rounded-full" />
            </div>

            {/* Name & Greeting */}
            <div className="text-center mt-8 space-y-2">
              <Skeleton className="h-10 w-64 mx-auto" />
              <div className="inline-flex items-center justify-center">
                <Skeleton className="h-6 w-48 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats & Actions Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Orders Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 space-y-4">
                <Skeleton className="h-16 w-16 mx-auto rounded-full" />
                <Skeleton className="h-6 w-48 mx-auto" />
                <Skeleton className="h-4 w-36 mx-auto" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </CardContent>
          </Card>
        </div>

        {/* Separator */}
        <div className="relative py-4">
          <Separator />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4">
            <Skeleton className="w-3 h-3 rounded-full" />
          </div>
        </div>

        {/* Recent Orders List */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
