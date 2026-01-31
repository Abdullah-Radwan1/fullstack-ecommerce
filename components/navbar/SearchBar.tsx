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
      `/${ar ? "ar" : "en"}/shop?page=1&search=${encodeURIComponent(query)}`,
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
          aria-label={ar ? "ابحث" : "Search input"}
          className="rounded border-none focus:ring-0 pl-12 pr-11"
        />

        <button
          type="button"
          onClick={navigate}
          aria-label={ar ? "بحث" : "Search"}
          className={`absolute ${ar ? "right-6" : "left-6"} top-1/2 -translate-y-1/2 `}
        >
          <Search size={20} aria-hidden="true" />
        </button>

        <Sparkles
          aria-hidden="true"
          className={`absolute ${ar ? "left-3" : "right-3"} 
          top-1/2 -translate-y-1/2 text-my-secondary animate-pulse`}
        />
      </div>
    </form>
  );
}
