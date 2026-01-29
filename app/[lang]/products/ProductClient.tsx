"use client";

import { useState, useMemo, useCallback } from "react";
import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/generated/prisma/browser";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Filter,
  Laptop,
  Headphones,
  Package,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Search,
  Zap,
  Sparkles,
  Clock,
  Shield,
  ShoppingBag,
  Tag,
  RefreshCw,
  Home,
  Layers,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ProductSkeleton from "@/components/ProductSkeleton";

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

const categoriesData = [
  {
    id: "all",
    labelEn: "All",
    labelAr: "الجميع",
    icon: Layers,
    color: "text-blue-400",
  },
  {
    id: "1",
    labelEn: "Laptops",
    labelAr: "لابات",
    icon: Laptop,
    color: "text-green-400",
  },
  {
    id: "2",
    labelEn: "Accessories",
    labelAr: "مستلزمات الكمبيوتر",
    icon: Headphones,
    color: "text-purple-400",
  },
  {
    id: "3",
    labelEn: "Others",
    labelAr: "أخرى",
    icon: Package,
    color: "text-orange-400",
  },
] as const;

export default function ProductsClient({
  initialProducts,
  hasMore,
  lang,
  initialSearch,
  initialCategory,
  initialPrice,
  initialPage,
}: ProductsClientProps) {
  const ar = lang === "ar";
  const router = useRouter();

  const [searchState, setSearchState] = useState(initialSearch);
  const [appliedCategory, setAppliedCategory] = useState<string[]>(
    initialCategory.split(","),
  );
  const [priceRange, setPriceRange] = useState<number[]>(initialPrice);
  const [page, setPage] = useState(initialPage);
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);
  const [isNavigatingPage, setIsNavigatingPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categories = useMemo(() => categoriesData, []);

  const handleCategoryChange = useCallback((id: string) => {
    setAppliedCategory((prev) => {
      if (id === "all") return ["all"];
      const updated = prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev.filter((c) => c !== "all"), id];
      return updated.length ? updated : ["all"];
    });
  }, []);

  const applyFilters = async () => {
    setIsApplyingFilters(true);
    setIsLoading(true);

    try {
      const categoryParam = appliedCategory.join(",");
      router.push(
        `/${lang}/products?page=1&search=${encodeURIComponent(searchState)}&category=${categoryParam}&min=${priceRange[0]}&max=${priceRange[1]}`,
      );
    } finally {
      // Note: The loading state will be cleared when the component re-renders with new data
      // We use a small timeout to ensure smooth transition
      setTimeout(() => {
        setIsApplyingFilters(false);
        setIsLoading(false);
      }, 500);
    }
  };

  const resetFilters = () => {
    setIsLoading(true);
    setAppliedCategory(["all"]);
    setPriceRange([0, 1300]);
    setSearchState("");
    router.push(`/${lang}/products?page=1`);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const goToPage = async (newPage: number) => {
    setIsNavigatingPage(true);
    setIsLoading(true);

    try {
      const categoryParam = appliedCategory.join(",");
      router.push(
        `/${lang}/products?page=${newPage}&search=${encodeURIComponent(searchState)}&category=${categoryParam}&min=${priceRange[0]}&max=${priceRange[1]}`,
      );
      setPage(newPage);
    } finally {
      setTimeout(() => {
        setIsNavigatingPage(false);
        setIsLoading(false);
      }, 500);
    }
  };

  const hasProducts = initialProducts.length > 0;

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto p-4 relative">
      {/* Global Loading Overlay */}

      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-my-main/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-my-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Filters */}
      <div className="lg:w-72 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={ar ? "ابحث عن منتجات..." : "Search products..."}
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyFilters(); // or your search function
              }
            }}
            className="pl-10 bg-card/50 border-border/40"
          />
        </div>

        {/* Categories */}
        <div className="bg-card/50 border border-border/40 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-my-main" />
            <span className="font-bold text-foreground">
              {ar ? "الفئات" : "Categories"}
            </span>
          </div>

          <div className="space-y-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = appliedCategory.includes(cat.id);
              return (
                <div
                  key={cat.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                    isActive
                      ? "bg-my-main/20 border border-my-main/30"
                      : "hover:bg-muted/30"
                  }`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <div className={cat.color}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <Label className="flex-1 cursor-pointer font-medium">
                    {ar ? cat.labelAr : cat.labelEn}
                  </Label>
                  <Checkbox
                    checked={isActive}
                    className={`border-2 ${isActive ? "border-my-main bg-my-main" : "border-border"}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Price */}
        <div className="bg-card/50 border border-border/40 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-my-main" />
            <span className="font-bold text-foreground">
              {ar ? "السعر" : "Price"}
            </span>
          </div>

          <Slider
            min={0}
            max={1300}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
          />

          <div className="flex justify-between mt-4 text-sm">
            <Badge variant="outline" className="border-my-main/30">
              ${priceRange[0]}
            </Badge>
            <Tag className="w-4 h-4 text-muted-foreground" />
            <Badge variant="outline" className="border-my-main/30">
              ${priceRange[1]}
            </Badge>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={applyFilters}
            disabled={isApplyingFilters || isLoading}
            className="flex-1 bg-gradient-to-r from-my-main to-my-secondary text-background"
          >
            {isApplyingFilters || isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Zap className="w-4 h-4 mr-2" />
            )}
            {isApplyingFilters
              ? ar
                ? "جاري التطبيق..."
                : "Applying..."
              : ar
                ? "تطبيق"
                : "Apply"}
          </Button>
          <Button
            variant="outline"
            onClick={resetFilters}
            disabled={isLoading}
            className="border-border"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Products */}
      <div className="flex-1 space-y-8">
        {/* Header */}
        <div className="bg-card/50 border border-border/40 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-my-main to-my-secondary rounded-full" />
                {ar ? "منتجاتنا المميزة" : "Featured Products"}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <ShoppingBag className="w-4 h-4" />
                {ar
                  ? `${initialProducts.length} منتج`
                  : `${initialProducts.length} products`}
              </div>
            </div>

            <div className="flex gap-3">
              <Badge className="bg-my-main/20 text-foreground border-my-main/30">
                <Clock className="w-3 h-3 mr-1" />
                {ar ? "صفحة" : "Page"} {page}
              </Badge>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                <Shield className="w-3 h-3 mr-1" />
                {ar ? "جودة" : "Premium"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        {hasProducts ? (
          <div className="space-y-8">
            {/* Pagination */}
            <div className="flex items-center justify-between">
              <Button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1 || isLoading}
                variant="outline"
                className="border-border"
              >
                {isNavigatingPage ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ChevronLeft className="w-4 h-4 mr-2" />
                )}
                {ar ? "السابق" : "Previous"}
              </Button>

              <div className="flex items-center gap-4">
                <Badge className="bg-my-main/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {ar ? "صفحة" : "Page"} {page}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {initialProducts.length} {ar ? "منتج" : "items"}
                </span>
              </div>

              <Button
                onClick={() => goToPage(page + 1)}
                disabled={!hasMore || isLoading}
                variant="outline"
                className="border-border"
              >
                {ar ? "التالي" : "Next"}
                {isNavigatingPage ? (
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-2" />
                )}
              </Button>
            </div>

            {/* Grid */}
            {isLoading || isApplyingFilters ? (
              <ProductSkeleton />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialProducts.map((product) => (
                  <ProductCard key={product.id} product={product} lang={lang} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-card/30 border border-border/40 rounded-xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-my-main/10 flex items-center justify-center">
              <Search className="w-10 h-10 text-my-main/50" />
            </div>
            <h3 className="text-2xl font-bold mb-3">
              {ar ? "لم يتم العثور على منتجات" : "No Products Found"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {ar
                ? "جرب تغيير فلتر البحث"
                : "Try adjusting your search filters"}
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={resetFilters}
                disabled={isLoading}
                className="border-border"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {ar ? "عرض الكل" : "Show All"}
              </Button>
              <Button asChild disabled={isLoading}>
                <Link href={ar ? "/ar" : "/en"}>
                  <Home className="w-4 h-4 mr-2" />
                  {ar ? "الرئيسية" : "Home"}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
