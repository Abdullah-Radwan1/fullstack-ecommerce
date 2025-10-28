"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import { useSearchStore } from "@/zustand/store";
import React from "react";

export function SearchBar({ ar }: { ar: boolean }) {
  const router = useRouter();
  const { searchQuery, setSearchQuery, toggleTrigger } = useSearchStore();

  // ✅ When Enter is pressed
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(
        `/${ar ? "ar" : "en"}/products?page=1&search=${encodeURIComponent(
          searchQuery
        )}`
      );
      toggleTrigger();
      console.log("trigger1");
    }
  };

  // ✅ When the Search icon is clicked
  const handleClick = () => {
    router.push(
      `/${ar ? "ar" : "en"}/products?page=1&search=${encodeURIComponent(
        searchQuery
      )}`
    );
    toggleTrigger(); // ✅ triggers the effect in ProductsClient
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()} // prevent reload
      className="relative w-full md:w-[60%] mb-2 mx-auto group"
    >
      {/* gradient border */}
      <div className="rounded p-[2px] bg-gradient-to-r from-my-main to-my-secondary relative">
        {/* input field */}
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={ar ? "ابحث عن ما في بالك" : "Search for anything"}
          className="rounded border-none focus:ring-0 focus:outline-none pl-12 pr-11"
        />

        {/* ✅ Search icon click triggers navigation */}
        <Search
          onClick={handleClick}
          size={30}
          className={`absolute ${
            ar ? "right-4" : "left-4"
          } top-1/2 -translate-y-1/2 text-muted-foreground hover:bg-accent p-1 hover:cursor-pointer transition`}
        />

        {/* sparkle icon (right) */}
        <Sparkles
          className={`absolute ${
            ar ? "left-3" : "right-3"
          } top-1/2 -translate-y-1/2 text-my-secondary animate-pulse`}
        />
      </div>
    </form>
  );
}
