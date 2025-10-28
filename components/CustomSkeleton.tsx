import React from "react";
import { Skeleton } from "./ui/skeleton";

const CustomSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(6)].map((_, index) => (
        <div key={index} className=" p-4">
          <Skeleton className="h-48 w-full  mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
};

export default CustomSkeleton;
