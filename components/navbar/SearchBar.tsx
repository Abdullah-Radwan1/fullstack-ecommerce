"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

export function SearchBar({ ar }: { ar: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const navigate = () => {
    router.push(
      `/${ar ? "ar" : "en"}/products?page=1&search=${encodeURIComponent(query)}`
    );
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="relative w-full md:w-[60%] mb-2 mx-auto group"
    >
      <div className="rounded p-[2px] bg-gradient-to-r from-my-main to-my-secondary relative">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && navigate()}
          placeholder={ar ? "ابحث عن ما في بالك" : "Search for anything"}
          className="rounded border-none focus:ring-0 pl-12 pr-11"
        />

        <Search
          onClick={navigate}
          size={30}
          className={`absolute ${ar ? "right-4" : "left-4"} 
          top-1/2 -translate-y-1/2 text-muted-foreground hover:bg-accent p-1 rounded-lg`}
        />

        <Sparkles
          className={`absolute ${ar ? "left-3" : "right-3"} 
          top-1/2 -translate-y-1/2 text-my-secondary animate-pulse`}
        />
      </div>
    </form>
  );
}
