"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

export function SearchBar({ ar }: { ar: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const base = ar ? "/products" : "/en/products";
    router.push(`${base}?search=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full md:w-[60%] mb-2 mx-auto  group"
    >
      <div className="p-[2px] rounded-full bg-gradient-to-r from-green-500 to-blue-600">
        <Input
          id="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={ar ? "ابحث عن منتج..." : "Search for products..."}
          className="  rounded-full border-none focus:ring-0 focus:outline-none bg-none"
        />
      </div>
      <Button
        type="submit"
        variant={"ghost"}
        className="absolute  left-4 top-1/2 -translate-y-1/2  "
      >
        <Search />
      </Button>
    </form>
  );
}
