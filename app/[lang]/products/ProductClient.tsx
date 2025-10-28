"use client";

import { useState, useEffect, useTransition } from "react";
import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/prisma/src/generated/client";
import { Loader2 } from "lucide-react";
import { getProducts } from "@/lib/functions/product/getProducts";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CustomSkeleton from "@/components/CustomSkeleton";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function ProductsClient({
  initialProducts,
  hasMore: initialHasMore,
  lang,
}: {
  initialProducts: Product[];
  hasMore: boolean;
  lang: string;
}) {
  const ar = lang === "ar";
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  // 🔹 Filters
  const [appliedCategory, setAppliedCategory] = useState<string[]>(["all"]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1300]);
  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 Categories list
  const categories = [
    { id: "all", labelEn: "All", labelAr: "الجميع" },
    { id: "1", labelEn: "Laptops", labelAr: "لابات" },
    { id: "2", labelEn: "Accessories", labelAr: "مستلزمات الكمبيوتر" },
    { id: "3", labelEn: "Others", labelAr: "أخرى" },
  ];

  // 🔹 Initialize search from URL param

  // 🔹 Handle category change
  const handleCategoryChange = (id: string) => {
    setAppliedCategory((prev) => {
      if (id === "all") return ["all"];
      const newCategories = prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev.filter((c) => c !== "all"), id];
      return newCategories.length ? newCategories : ["all"];
    });
  };

  // 🔹 Fetch products
  const handleFetch = (newPage = 1, query = searchQuery) => {
    startTransition(async () => {
      const category = appliedCategory.join(",");
      const [min, max] = priceRange;

      const { products, hasMore } = await getProducts({
        page: newPage,
        category,
        min: String(min),
        max: String(max),
        search: query,
      });

      setProducts(products);
      setHasMore(hasMore);
      setPage(newPage);
      setSearchQuery(query);
    });
  };

  // 🔹 Apply filters & search
  const handleApplyFilters = () => {
    // Update URL param
    router.push(
      `/${lang}/products?page=1&search=${encodeURIComponent(searchQuery)}`
    );
    handleFetch(1, searchQuery);
  };

  // 🔹 Reset all
  const resetFilters = () => {
    setAppliedCategory(["all"]);
    setPriceRange([0, 1300]);
    setSearchQuery("");
    router.push(`/${lang}/products?page=1`);
    handleFetch(1, "");
  };

  const nextPage = () => handleFetch(page + 1, searchQuery);
  const prevPage = () => handleFetch(page - 1, searchQuery);
  useEffect(() => {
    const searchParam = searchParams.get("search") || "";
    setSearchQuery(searchParam);
    handleFetch(1, searchParam);
  }, [searchParams, handleFetch]);
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* 🔍 Filters Section */}
      <section className="w-full lg:w-80 bg-muted/50 p-6 rounded-xl shadow-sm h-fit">
        <h2 className="text-lg font-semibold mb-4">
          {ar ? "تصفية النتائج" : "Filters"}
        </h2>

        {/* 🔎 Search Input */}
        <div className="mb-4">
          <Input
            placeholder={ar ? "ابحث عن منتج..." : "Search for a product..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleApplyFilters();
            }}
          />
        </div>

        {/* Categories */}
        <h3 className="text-sm font-medium mb-2">
          {ar ? "الفئات" : "Categories"}
        </h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center space-x-2">
              <Checkbox
                id={cat.id}
                checked={appliedCategory.includes(cat.id)}
                onCheckedChange={() => handleCategoryChange(cat.id)}
              />
              <Label htmlFor={cat.id}>{ar ? cat.labelAr : cat.labelEn}</Label>
            </div>
          ))}
        </div>

        {/* Price Range */}
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">
            {ar ? "السعر" : "Price Range"} (USD)
          </h3>
          <Slider
            dir={ar ? "rtl" : "ltr"}
            min={0}
            max={1300}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Apply & Reset */}
        <div className="mt-6 flex gap-3">
          <Button onClick={handleApplyFilters} disabled={isPending}>
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : ar ? (
              "تطبيق"
            ) : (
              "Apply"
            )}
          </Button>
          <Button variant="outline" onClick={resetFilters}>
            {ar ? "مسح الفلتر" : "Reset Filters"}
          </Button>
        </div>
      </section>

      {/* 🛍 Product Grid */}
      <section className="flex-1 flex flex-col">
        {isPending ? (
          <CustomSkeleton />
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} lang={ar ? "ar" : "en"} />
            ))}
          </div>
        ) : (
          <Image
            src={"/no-product.png"}
            width={300}
            height={300}
            alt="no product found"
            className="mx-auto"
          />
        )}

        {/* Pagination */}
        <div className="flex flex-1 items-end justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={page === 1 || isPending}
          >
            {ar ? "السابق" : "Previous"}
          </Button>
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={!hasMore || isPending}
          >
            {ar ? "التالي" : "Next"}
          </Button>
        </div>
      </section>
    </div>
  );
}
