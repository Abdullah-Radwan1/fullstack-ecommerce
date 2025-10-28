"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import { useSearchStore } from "@/zustand/store";

export function SearchBar({ ar }: { ar: boolean }) {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useSearchStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/${ar ? "ar" : "en"}/products?search=${encodeURIComponent(
        searchQuery
      )}&page=1`
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full md:w-[60%] mb-2 mx-auto group"
    >
      {/* gradient border */}
      <div className="p-[2px] rounded-full bg-gradient-to-r from-my-main to-my-secondary relative">
        {/* input field */}
        <Input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={ar ? "ابحث عن ما في بالك" : "Search for anything"}
          className="rounded-full border-none focus:ring-0 focus:outline-none pl-12 pr-11"
        />

        {/* search icon (left) */}
        <Search
          onClick={handleSearch}
          size={30}
          className={`absolute ${
            ar ? "right-4" : "left-4"
          } top-1/2 -translate-y-1/2 text-muted-foreground hover:bg-accent rounded-2xl p-1 hover:cursor-pointer transition`}
        />

        {/* sparkle icon (right) — only show when input is empty */}
        {!searchQuery && (
          <Sparkles
            className={`absolute ${
              ar ? "left-3" : "right-3"
            } top-1/2 -translate-y-1/2 text-my-secondary animate-pulse`}
          />
        )}
      </div>
    </form>
  );
}
