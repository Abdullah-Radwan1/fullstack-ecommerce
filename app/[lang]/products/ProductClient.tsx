"use client";

import {
  useCallback,
  useMemo,
  useState,
  useTransition,
  useEffect,
} from "react";
import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/prisma/src/generated/client";
import { Loader2 } from "lucide-react";
import { getProducts } from "@/lib/functions/product/getProducts";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CustomSkeleton from "@/components/CustomSkeleton";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useSearchStore } from "@/zustand/store";
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
  const router = useRouter();
  const pathname = usePathname();

  const { searchQuery, setSearchQuery, triggerSearch, toggleTrigger } =
    useSearchStore();

  const [products, setProducts] = useState(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const [appliedCategory, setAppliedCategory] = useState<string[]>(["all"]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1300]);

  const categories = useMemo(
    () => [
      { id: "all", labelEn: "All", labelAr: "الجميع" },
      { id: "1", labelEn: "Laptops", labelAr: "لابات" },
      { id: "2", labelEn: "Accessories", labelAr: "مستلزمات الكمبيوتر" },
      { id: "3", labelEn: "Others", labelAr: "أخرى" },
    ],
    []
  );

  // Category toggle logic
  const handleCategoryChange = useCallback((id: string) => {
    setAppliedCategory((prev) => {
      if (id === "all") return ["all"];
      const newCategories = prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev.filter((c) => c !== "all"), id];
      return newCategories.length ? newCategories : ["all"];
    });
  }, []);

  // Core fetch function
  const handleFetch = useCallback(
    async (
      newPage = 1,
      search = searchQuery,
      categoriesParam = appliedCategory,
      price = priceRange
    ) => {
      startTransition(async () => {
        const category = categoriesParam.join(",");
        const [min, max] = price;

        const { products, hasMore } = await getProducts({
          page: newPage,
          category,
          min: String(min),
          max: String(max),
          search,
        });

        setProducts(products);
        setHasMore(hasMore);
        setPage(newPage);
      });
    },
    [appliedCategory, priceRange, searchQuery]
  );

  // Apply filters manually
  const handleApplyFilters = () => {
    handleFetch(1);
    router.push(
      `/${lang}/products?page=1&search=${encodeURIComponent(searchQuery)}`
    );
  };

  // Reset filters
  const resetFilters = () => {
    const defaultCategory = ["all"];
    const defaultPrice = [0, 1300];

    setAppliedCategory(defaultCategory);
    setPriceRange(defaultPrice);
    setSearchQuery("");

    handleFetch(1, "", defaultCategory, defaultPrice);
    router.push(`/${lang}/products?page=1`);
  };

  // Pagination
  const nextPage = () =>
    handleFetch(page + 1, searchQuery, appliedCategory, priceRange);
  const prevPage = () =>
    handleFetch(page - 1, searchQuery, appliedCategory, priceRange);

  // Handle cross-page search (Zustand trigger)
  useEffect(() => {
    if (!triggerSearch || !pathname.includes("/products")) return;

    const runSearch = async () => {
      await handleFetch(1);
      toggleTrigger(); // reset Zustand trigger
    };

    runSearch();
  }, [triggerSearch, pathname]);

  // Optional: debounce search (if user types fast)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        handleFetch(1);
      }
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Section */}
      <section className="w-full lg:w-80  p-6 shadow-sm h-fit rounded-md">
        <h2 className="text-lg font-semibold mb-4">
          {ar ? "تصفية النتائج" : "Filters"}
        </h2>

        {/* Search Input */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder={ar ? "ابحث عن منتج..." : "Search for a product..."}
            value={searchQuery}
            className="bg-transparent  "
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && toggleTrigger()}
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

        {/* Apply & Reset Buttons */}
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

      {/* Product Grid */}
      <section className="flex-1 flex flex-col">
        {isPending ? (
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
              alt="no product found"
              className="mx-auto opacity-70"
            />
            <p className="mt-4 text-muted-foreground">
              {ar ? "لا توجد منتجات مطابقة" : "No matching products found."}
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between mt-8">
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
