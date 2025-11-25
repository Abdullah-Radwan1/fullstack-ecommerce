"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/generated/prisma/browser";
import { Loader2 } from "lucide-react";
import { getProducts } from "@/lib/functions/product/getProducts";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CustomSkeleton from "@/components/CustomSkeleton";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

type selectedProducts = Omit<Product, "createdAt" | "updatedAt" | "userId">;

export default function ProductsClient({
  initialProducts,
  hasMore: initialHasMore,
  lang,
}: {
  initialProducts: selectedProducts[];
  hasMore: boolean;
  lang: string;
}) {
  const ar = lang === "ar";
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract URL params
  const search = searchParams.get("search") || "";
  const pageFromParam = Number(searchParams.get("page") || 1);
  const categoryFromParam = searchParams.get("category") || "all";
  const min = Number(searchParams.get("min") || 0);
  const max = Number(searchParams.get("max") || 1300);

  const [products, setProducts] = useState(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(pageFromParam);

  const [appliedCategory, setAppliedCategory] = useState<string[]>(
    categoryFromParam.split(",")
  );
  const [priceRange, setPriceRange] = useState<number[]>([min, max]);
  const [isLoading, setIsLoading] = useState(false);

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

  // Fetch products
  const handleFetch = useCallback(
    async (
      pageParam = 1,
      searchText = search,
      categoryParam = appliedCategory,
      price = priceRange
    ) => {
      setIsLoading(true);
      try {
        const category = categoryParam.join(",");
        const [minVal, maxVal] = price;

        const { products, hasMore } = await getProducts({
          page: pageParam,
          category,
          min: String(minVal),
          max: String(maxVal),
          search: searchText,
        });

        setProducts(products);
        setHasMore(hasMore);
        setPage(pageParam);
      } finally {
        setIsLoading(false);
      }
    },
    [appliedCategory, priceRange, search]
  );

  // Load products whenever URL changes
  useEffect(() => {
    const categoryParam = (searchParams.get("category") || "all").split(",");
    const minParam = Number(searchParams.get("min") || 0);
    const maxParam = Number(searchParams.get("max") || 1300);

    setAppliedCategory(categoryParam);
    setPriceRange([minParam, maxParam]);

    handleFetch(pageFromParam, search, categoryParam, [minParam, maxParam]);
  }, [searchParams]);

  // Apply filters
  const handleApplyFilters = () => {
    const category = appliedCategory.join(",");
    const [minVal, maxVal] = priceRange;

    router.push(
      `/${lang}/products?page=1` +
        `&search=${encodeURIComponent(search)}` +
        `&category=${category}` +
        `&min=${minVal}&max=${maxVal}`
    );
  };

  // Pagination
  const nextPage = () => {
    const category = appliedCategory.join(",");
    const [minVal, maxVal] = priceRange;

    router.push(
      `/${lang}/products?page=${page + 1}` +
        `&search=${encodeURIComponent(search)}` +
        `&category=${category}&min=${minVal}&max=${maxVal}`
    );
  };

  const prevPage = () => {
    const category = appliedCategory.join(",");
    const [minVal, maxVal] = priceRange;

    router.push(
      `/${lang}/products?page=${page - 1}` +
        `&search=${encodeURIComponent(search)}` +
        `&category=${category}&min=${minVal}&max=${maxVal}`
    );
  };

  // Reset
  const resetFilters = () => {
    setAppliedCategory(["all"]);
    setPriceRange([0, 1300]);
    router.push(`/${lang}/products?page=1`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
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
          <Button onClick={handleApplyFilters} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : ar ? (
              "تطبيق"
            ) : (
              "Apply"
            )}
          </Button>
          <Button variant="outline" onClick={resetFilters}>
            {ar ? "مسح الفلتر" : "Reset"}
          </Button>
        </div>
      </section>

      {/* Products */}
      <section className="flex-1 flex flex-col">
        {isLoading ? (
          <CustomSkeleton />
        ) : products.length > 0 ? (
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

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={page === 1 || isLoading}
          >
            {ar ? "السابق" : "Previous"}
          </Button>
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={!hasMore || isLoading}
          >
            {ar ? "التالي" : "Next"}
          </Button>
        </div>
      </section>
    </div>
  );
}
