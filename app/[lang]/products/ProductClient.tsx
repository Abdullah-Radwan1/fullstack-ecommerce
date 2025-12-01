"use client";

import { useState, useMemo, useCallback } from "react";
import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/generated/prisma/browser";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Image from "next/image";

type selectedProducts = Omit<Product, "createdAt" | "updatedAt" | "userId">;

interface ProductsClientProps {
  initialProducts: selectedProducts[];
  hasMore: boolean;
  lang: string;
  initialSearch: string;
  initialCategory: string;
  initialPrice: [number, number];
  initialPage: number;
}

export default function ProductsClient({
  initialProducts,
  hasMore: initialHasMore,
  lang,
  initialSearch,
  initialCategory,
  initialPrice,
  initialPage,
}: ProductsClientProps) {
  const ar = lang === "ar";
  const router = useRouter();

  // Local UI state
  const [searchState, setSearchState] = useState(initialSearch);
  const [appliedCategory, setAppliedCategory] = useState<string[]>(
    initialCategory.split(",")
  );
  const [priceRange, setPriceRange] = useState<number[]>(initialPrice);
  const [page, setPage] = useState(initialPage);

  const products = initialProducts;
  const hasMore = initialHasMore;

  const categories = useMemo(
    () => [
      { id: "all", labelEn: "All", labelAr: "الجميع" },
      { id: "1", labelEn: "Laptops", labelAr: "لابات" },
      { id: "2", labelEn: "Accessories", labelAr: "مستلزمات الكمبيوتر" },
      { id: "3", labelEn: "Others", labelAr: "أخرى" },
    ],
    []
  );

  const handleCategoryChange = useCallback((id: string) => {
    setAppliedCategory((prev) => {
      if (id === "all") return ["all"];
      const updated = prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev.filter((c) => c !== "all"), id];
      return updated.length ? updated : ["all"];
    });
  }, []);

  const applyFilters = () => {
    const categoryParam = appliedCategory.join(",");
    router.push(
      `/${lang}/products?page=1` +
        `&search=${encodeURIComponent(searchState)}` +
        `&category=${categoryParam}&min=${priceRange[0]}&max=${priceRange[1]}`
    );
  };

  const resetFilters = () => {
    setAppliedCategory(["all"]);
    setPriceRange([0, 1300]);
    setSearchState("");
    router.push(`/${lang}/products?page=1`);
  };

  const goToPage = (newPage: number) => {
    const categoryParam = appliedCategory.join(",");
    router.push(
      `/${lang}/products?page=${newPage}` +
        `&search=${encodeURIComponent(searchState)}` +
        `&category=${categoryParam}&min=${priceRange[0]}&max=${priceRange[1]}`
    );
    setPage(newPage);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-[90%] mx-auto p-2">
      {/* Filters */}
      <section className="w-full lg:w-80 p-6 shadow-sm h-fit rounded-md">
        <h2 className="text-lg font-semibold mb-4">
          {ar ? "تصفية النتائج" : "Filters"}
        </h2>

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

        {/* Price */}
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

        <div className="mt-6 flex gap-3">
          <Button onClick={applyFilters}>{ar ? "تطبيق" : "Apply"}</Button>
          <Button variant="outline" onClick={resetFilters}>
            {ar ? "مسح الفلتر" : "Reset"}
          </Button>
        </div>
      </section>

      {/* Products */}
      <section className="flex-1 flex flex-col">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-8">
            <Image
              src="/no-product.png"
              width={300}
              height={300}
              alt="no product"
              className="mx-auto opacity-70"
            />
            <p className="mt-4 text-muted-foreground">
              {ar ? "لا توجد منتجات مطابقة" : "No matching products found."}
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between mt-8">
          <Button onClick={() => goToPage(page - 1)} disabled={page === 1}>
            {ar ? "السابق" : "Previous"}
          </Button>
          <Button onClick={() => goToPage(page + 1)} disabled={!hasMore}>
            {ar ? "التالي" : "Next"}
          </Button>
        </div>
      </section>
    </div>
  );
}
