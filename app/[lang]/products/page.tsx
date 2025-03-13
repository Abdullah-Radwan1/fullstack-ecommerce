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
import { Product } from "@prisma/client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [products, setProducts] = useState([]);
  const { lang } = useParams();
  const ar = lang === "ar";
  const [loading, setLoading] = useState(true);

  // Translations
  const translations = {
    title: ar ? "المنتجات" : "Products",
    searchPlaceholder: ar ? "ابحث عن المنتجات..." : "Search products...",
    filterPlaceholder: ar ? "الفئة" : "Category",
    noProducts: ar ? "لا توجد منتجات." : "No products found.",
    price: ar ? "السعر" : "Price",
    previous: ar ? "السابق" : "Previous",
    next: ar ? "التالي" : "Next",
    categories: {
      all: ar ? "الكل" : "All",
      accessories: ar ? "منتجات للبي سي" : "PC Accessories",
      labs: ar ? "Labs" : "لابات",
      other: ar ? "مستلزمات اخري" : "Other",
    },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch(
        `/api/products?page=${page}&search=${search}&category=${category}`
      );
      const data = await response.json();
      setProducts(data.products);
      setHasMore(data.hasMore);
      setLoading(false);
    };

    fetchProducts();
  }, [page, search, category]);

  return (
    <div className="p-8 container m-auto min-h-[60vh]">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 text-center">
        {translations.title}
      </h1>

      {/* Search Bar and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-[60%] lg:w-[40%] m-auto">
        <Input
          type="text"
          placeholder={translations.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-[60%] p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        {/* Filter Options */}
        <Select
          dir={ar ? "rtl" : "ltr"}
          onValueChange={(value) => {
            setCategory(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
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
          {[...Array(2)].map((_, index) => (
            <div key={index} className=" rounded-lg p-4">
              <Skeleton className="h-48 w-full rounded-lg mb-4" />{" "}
              {/* Image placeholder */}
              <Skeleton className="h-6 w-3/4 mb-2" />{" "}
              {/* Product name placeholder */}
              <Skeleton className="h-4 w-1/2" /> {/* Price placeholder */}
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 justify-center items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product: Product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">{translations.noProducts}</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-6">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="  bg-blue-500 text-white hover:text-black"
        >
          {translations.previous}
        </Button>
        <Button
          disabled={!hasMore}
          onClick={() => setPage((prev) => prev + 1)}
          className=" bg-blue-500 text-white hover:text-black"
        >
          {translations.next}
        </Button>
      </div>
    </div>
  );
}
