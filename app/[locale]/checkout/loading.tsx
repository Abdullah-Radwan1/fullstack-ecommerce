import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Column: Order Summary */}
      <div className="lg:col-span-1">
        <div className="h-1 w-full bg-gradient-to-r mb-4 from-my-main via-my-secondary to-my-main" />
        <div className="space-y-6">
          {/* Secure Checkout Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          {/* Payment Form Card */}
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Payment Element Skeleton */}
              <div className="space-y-4">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <Skeleton className="h-5 w-40" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex gap-2">
                      <Skeleton className="h-10 w-20 rounded-md" />
                      <Skeleton className="h-10 flex-1 rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-4">
              <Skeleton className="h-12 w-full rounded-md" />
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div className="lg:col-span-1">
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="h-1 w-full bg-gradient-to-r from-my-main via-my-secondary to-my-main" />

          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Products List Skeleton */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="space-y-3">
                  <div className="flex items-center gap-4 p-2">
                    <Skeleton className="w-16 h-16 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <div className="flex justify-between">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </div>
                  {item !== 3 && <Separator />}
                </div>
              ))}
            </div>

            {/* Order Totals Skeleton */}
            <div className="space-y-3 pt-4 border-t border-border/40">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>

            <Separator />

            {/* Total Amount Skeleton */}
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-6 w-32" />
              <div className="text-right space-y-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </CardContent>

          {/* Secure Payment Info Skeleton */}
          <CardFooter className="pt-4">
            <Skeleton className="h-4 w-full" />
          </CardFooter>
        </Card>

        {/* Product Count Badge Skeleton */}
        <Skeleton className="w-full h-10 mt-4 rounded-full" />
      </div>
    </div>
  );
}
