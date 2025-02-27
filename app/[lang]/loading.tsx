import React from "react";
import { Loader2 } from "lucide-react";
export default () => {
  return (
    <div className="flex animate-spin justify-center items-center min-h-[70vh]">
      <Loader2 />
    </div>
  );
};
