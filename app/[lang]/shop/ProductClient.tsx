"use client";

import { useState, useCallback } from "react";
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
  X,
  Funnel,
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

  const [search, setSearch] = useState(initialSearch);
  const [categories, setCategories] = useState<string[]>(
    initialCategory.split(","),
  );
  const [priceRange, setPriceRange] = useState<number[]>(initialPrice);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleCategory = useCallback((id: string) => {
    setCategories((prev) => {
      if (id === "all") return ["all"];
      const updated = prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev.filter((c) => c !== "all"), id];
      return updated.length ? updated : ["all"];
    });
  }, []);

  const navigateTo = (pageNum: number = 1) => {
    setIsLoading(true);
    router.push(
      `/${lang}/shop?page=${pageNum}&search=${encodeURIComponent(search)}&category=${categories.join(",")}&min=${priceRange[0]}&max=${priceRange[1]}`,
    );
    setTimeout(() => setIsLoading(false), 500);
  };

  const applyFilters = () => {
    navigateTo(1);
    setIsSidebarOpen(false);
  };

  const resetFilters = () => {
    setSearch("");
    setCategories(["all"]);
    setPriceRange([0, 1300]);
    navigateTo(1);
    setIsSidebarOpen(false);
  };

  const goToPage = (newPage: number) => {
    setPage(newPage);
    navigateTo(newPage);
  };

  const hasProducts = initialProducts.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/40 p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="hover:rotate-180 w-8 h-8"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X /> : <Funnel />}
        </Button>
        <h1 className="text-xl font-bold">
          {ar ? "منتجاتنا المميزة" : "Featured Products"}
        </h1>
        <div className="w-10" />
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-8 p-4 relative">
        {/* Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-my-main/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-my-secondary/10 rounded-full blur-3xl" />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 lg:top-24 h-screen lg:h-fit w-80 lg:w-full bg-background lg:bg-transparent border-r lg:border-0 border-border/40 shadow-xl lg:shadow-none z-50 lg:z-auto transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} overflow-y-auto lg:overflow-visible p-6 lg:p-0`}
        >
          <div className="space-y-6">
            {/* Mobile title */}
            <div className="flex justify-between items-center lg:hidden">
              <h2 className="text-xl font-bold">
                {ar ? "الفلاتر" : "Filters"}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-10 bg-card/50 border-border/40"
                placeholder={ar ? "ابحث عن منتجات..." : "Search products..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              />
            </div>

            {/* Categories */}
            <div className="bg-card/50 border border-border/40 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-my-main" />
                <span className="font-bold">
                  {ar ? "الفئات" : "Categories"}
                </span>
              </div>
              <div className="space-y-3">
                {categoriesData.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = categories.includes(cat.id);
                  return (
                    <div
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${isActive ? "bg-my-main/20 border border-my-main/30" : "hover:bg-muted/30"}`}
                    >
                      <Icon className={`w-5 h-5 ${cat.color}`} />
                      <Label className="flex-1 font-medium cursor-pointer">
                        {ar ? cat.labelAr : cat.labelEn}
                      </Label>
                      <Checkbox checked={isActive} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price */}
            <div className="bg-card/50 border border-border/40 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-my-main" />
                <span className="font-bold">{ar ? "السعر" : "Price"}</span>
              </div>
              <Slider
                min={0}
                max={1300}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-4 text-sm">
                <Badge variant="outline">${priceRange[0]}</Badge>
                <Tag className="w-4 h-4 text-muted-foreground" />
                <Badge variant="outline">${priceRange[1]}</Badge>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 sticky bottom-0 bg-background/95 p-4 -mx-6 border-t lg:static lg:p-0 lg:mx-0 lg:border-0">
              <Button
                onClick={applyFilters}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-my-main to-my-secondary"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Zap className="w-4 h-4 mr-2" />
                )}
                {ar ? "تطبيق" : "Apply"}
              </Button>
              <Button
                variant="outline"
                onClick={resetFilters}
                disabled={isLoading}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </aside>

        {/* Products */}
        <main className="space-y-8">
          {isLoading ? (
            <ProductSkeleton />
          ) : hasProducts ? (
            <>
              {/* Pagination */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => goToPage(page - 1)}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  {ar ? "السابق" : "Previous"}
                </Button>
                <Badge className="bg-my-main/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {ar ? "صفحة" : "Page"} {page}
                </Badge>
                <Button
                  variant="outline"
                  disabled={!hasMore}
                  onClick={() => goToPage(page + 1)}
                >
                  {ar ? "التالي" : "Next"}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Header */}
              <div className="bg-card/50 border border-border/40 rounded-xl p-6 mb-2">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {initialProducts.map((product) => (
                  <ProductCard key={product.id} product={product} lang={lang} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-card/30 border border-border/40 rounded-xl">
              <h3 className="text-2xl font-bold mb-3">
                {ar ? "لم يتم العثور على منتجات" : "No Products Found"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {ar
                  ? "جرب تغيير فلتر البحث"
                  : "Try adjusting your search filters"}
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={resetFilters}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {ar ? "عرض الكل" : "Show All"}
                </Button>
                <Button asChild>
                  <Link href={ar ? "/ar" : "/en"}>
                    <Home className="w-4 h-4 mr-2" />
                    {ar ? "الرئيسية" : "Home"}
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
