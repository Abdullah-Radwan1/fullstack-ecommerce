"use client";

import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/prisma/src/generated/client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedCategory, setAppliedCategory] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1300]);
  const [hasMore, setHasMore] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyFilters, setApplyFilters] = useState(false);
  const { lang } = useParams();
  const ar = lang === "ar";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const translations = {
    title: ar ? "المنتجات" : "Products",
    searchPlaceholder: ar ? "ابحث عن المنتجات..." : "Search products...",
    filterTitle: ar ? "تصفية النتائج" : "Filters",
    categoryTitle: ar ? "الفئات" : "Categories",
    priceTitle: ar ? "السعر" : "Price Range",
    apply: ar ? "تطبيق" : "Apply",
    reset: ar ? "إعادة تعيين" : "Reset",
    noProducts: ar ? "لا توجد منتجات." : "No products found.",
    previous: ar ? "السابق" : "Previous",
    next: ar ? "التالي" : "Next",
    categories: [
      { id: "all", label: ar ? "الجميع" : "All" },
      { id: "1", label: ar ? "لابات" : "Laptops" },
      { id: "2", label: ar ? "منتجات للبي سي" : "PC Accessories" },
      { id: "3", label: ar ? "مستلزمات أخرى" : "Other" },
    ],
  };

  // ✅ Fetch products whenever filters or pagination change
  useEffect(() => {
    const searchParam = searchParams.get("search") || "";

    if (searchParam !== appliedSearch) {
      setAppliedSearch(searchParam);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      const categoryQuery = appliedCategory.join(",");
      const [min, max] = priceRange;

      const response = await fetch(
        `/api/products?page=${page}&search=${appliedSearch}&category=${categoryQuery}&min=${min}&max=${max}`
      );
      const data = await response.json();
      setProducts(data.products);
      setHasMore(data.hasMore);
      setLoading(false);
    };

    fetchProducts();
  }, [page, appliedSearch, searchParams, applyFilters]);

  // ✅ Handle category checkbox toggle
  const toggleCategory = (id: string, checked: boolean) => {
    setAppliedCategory((prev) =>
      checked ? [...prev, id] : prev.filter((c) => c !== id)
    );
  };

  // ✅ Reset filters
  const resetFilters = () => {
    setAppliedCategory([]);
    setPriceRange([0, 1300]);
    setPage(1);
    setAppliedSearch("");

    // ✅ Remove all search params from the URL
    router.replace(pathname);
  };

  return (
    <div className="p-8 container mx-auto min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {translations.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 🔹 Left Sidebar Filters */}
        <aside className="md:col-span-1  rounded-lg p-4 h-fit">
          <h2 className="text-xl font-semibold mb-4">
            {translations.filterTitle}
          </h2>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">{translations.categoryTitle}</h3>
            <div className="space-y-3">
              {translations.categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    id={`cat-${cat.id}`}
                    checked={appliedCategory.includes(cat.id)}
                    onCheckedChange={(checked) =>
                      toggleCategory(cat.id, !!checked)
                    }
                  />
                  <Label htmlFor={`cat-${cat.id}`}>{cat.label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium mb-4">{translations.priceTitle}</h3>
            <div className="px-2">
              <Slider
                defaultValue={[0, 1000]}
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={1500}
                step={10}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>
                  {ar ? "من: " : "Min: "} {priceRange[0]}
                </span>
                <span>
                  {ar ? "إلى: " : "Max: "} {priceRange[1]}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={resetFilters}
              className="w-[48%]"
            >
              {translations.reset}
            </Button>
            <Button
              onClick={() => {
                setPage(1);
                setApplyFilters((prev) => !prev);
              }}
              className="w-[48%]"
            >
              {translations.apply}
            </Button>
          </div>
        </aside>

        {/* 🔹 Right Products Grid */}
        <section className="md:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="rounded-lg p-4">
                  <Skeleton className="h-48 w-full rounded-lg mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <ProductCard
                  lang={ar ? "ar" : "en"}
                  product={product}
                  key={product.id}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              {translations.noProducts}
            </p>
          )}

          {/* Pagination */}
          <div className="flex justify-between mt-6">
            <Button
              name="previous"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              {translations.previous}
            </Button>
            <Button
              name="next"
              disabled={!hasMore}
              onClick={() => setPage((prev) => prev + 1)}
              variant="outline"
            >
              {translations.next}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
