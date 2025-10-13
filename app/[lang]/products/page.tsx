"use client";

import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/prisma/src/generated/client";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { lang } = useParams();
  const ar = lang === "ar";
  const searchParams = useSearchParams();
  const translations = {
    title: ar ? "المنتجات" : "Products",
    searchPlaceholder: ar ? "ابحث عن المنتجات..." : "Search products...",
    filterPlaceholder: ar ? "الفئة" : "Category",
    noProducts: ar ? "لا توجد منتجات." : "No products found.",
    price: ar ? "السعر" : "Price",
    previous: ar ? "السابق" : "Previous",
    next: ar ? "التالي" : "Next",
    search: ar ? "بحث" : "Search",
    categories: {
      all: ar ? "الكل" : "All",
      accessories: ar ? "منتجات للبي سي" : "PC Accessories",
      labs: ar ? "لابات" : "Laptops",
      other: ar ? "مستلزمات اخري" : "Other",
    },
  };

  // ✅ Step 1: Read query param once on mount
  useEffect(() => {
    const searchParam = searchParams.get("search") || "";

    // 1️⃣ Update appliedSearch if URL search param changes
    if (searchParam !== appliedSearch) {
      setAppliedSearch(searchParam);
      return; // Wait for next render to fetch products with new appliedSearch
    }

    // 2️⃣ Fetch products whenever appliedSearch, appliedCategory, or page changes
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch(
        `/api/products?page=${page}&search=${appliedSearch}&category=${appliedCategory}`
      );
      const data = await response.json();
      setProducts(data.products);
      setHasMore(data.hasMore);
      setLoading(false);
    };

    fetchProducts();
  }, [page, appliedSearch, appliedCategory, searchParams]);

  return (
    <div className="p-8 container m-auto min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {translations.title}
      </h1>

      {/* Search + Filter */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-[60%] lg:w-[40%] m-auto">
        <Select
          dir={ar ? "rtl" : "ltr"}
          onValueChange={(value: any) => {
            setCategory(value);
            setPage(1);
            setAppliedSearch(appliedSearch); // include search in query
            setAppliedCategory(value);
          }}
        >
          <SelectTrigger className="w-full sm:w-[25%]">
            <SelectValue placeholder={translations.filterPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{translations.categories.all}</SelectItem>
            <SelectItem value="1">{translations.categories.labs}</SelectItem>
            <SelectItem value="2">
              {translations.categories.accessories}
            </SelectItem>
            <SelectItem value="3">{translations.categories.other}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product List */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="rounded-lg p-4">
              <Skeleton className="h-48 w-full rounded-lg mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product: Product) => (
            <ProductCard
              lang={ar ? "ar" : "en"}
              product={product}
              key={product.id}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">{translations.noProducts}</p>
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <Button
          variant={"outline"}
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          {translations.previous}
        </Button>
        <Button
          disabled={!hasMore}
          onClick={() => setPage((prev) => prev + 1)}
          variant={"outline"}
        >
          {translations.next}
        </Button>
      </div>
    </div>
  );
}
