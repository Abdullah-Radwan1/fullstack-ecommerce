"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-8 p-4">
      {/* ===================== */}
      {/* Sidebar Filters */}
      {/* ===================== */}
      <aside className="hidden lg:block space-y-6">
        {/* Search */}
        <Skeleton className="h-10 w-full rounded-lg" />

        {/* Categories */}
        <Card className="bg-card/50 border-border/40 p-6 space-y-4">
          <Skeleton className="h-5 w-32" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-4 rounded" />
            </div>
          ))}
        </Card>

        {/* Price */}
        <Card className="bg-card/50 border-border/40 p-6 space-y-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-2 w-full rounded-full" />
          <div className="flex justify-between">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 w-12 rounded-lg" />
        </div>
      </aside>

      {/* ===================== */}
      {/* Main Content */}
      {/* ===================== */}
      <main className="space-y-8">
        {/* Pagination */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>

        {/* Header */}
        <Card className="bg-card/50 border-border/40 p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-3">
              <Skeleton className="h-7 w-64" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-28 rounded-full" />
            </div>
          </div>
        </Card>

        {/* Products Grid */}
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
      </main>
    </div>
  );
}
