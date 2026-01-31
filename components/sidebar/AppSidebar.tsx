"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  CreditCard,
  Truck,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useCartStore, { useSidebarStore } from "@/zustand/store";
import Sideitem from "./sideItems";
import clsx from "clsx";
import { useParams } from "next/navigation";

const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_COST = 5.99;

const SideCart = () => {
  const { togglestate, setTogglestate } = useSidebarStore();
  const products = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const { lang } = useParams<{ lang: string }>();
  const ar = lang === "ar";

  const [showContent, setShowContent] = useState(false);

  const t = (arText: string, enText: string) => (ar ? arText : enText);

  /* ---------------- Calculations ---------------- */
  const subtotal = useMemo(() => getTotalPrice(), [getTotalPrice]);

  const remaining = useMemo(
    () => Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0),
    [subtotal],
  );

  const progress = useMemo(
    () => Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100),
    [subtotal],
  );

  const shipping = useMemo(
    () => (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST),
    [subtotal],
  );

  const finalTotal = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  /* ---------------- Effects ---------------- */
  useEffect(() => {
    if (!togglestate) {
      setShowContent(false);
      return;
    }

    const timer = setTimeout(() => setShowContent(true), 150);
    return () => clearTimeout(timer);
  }, [togglestate]);

  const closeSidebar = () => setTogglestate(false);

  if (!togglestate) return null;

  return (
    <div
      dir={ar ? "rtl" : "ltr"}
      data-testid="SideCart"
      className="fixed inset-0 z-[100]"
      onClick={closeSidebar}
    >
      {/* Backdrop */}
      <div
        className={clsx(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500",
          togglestate ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Sidebar */}
      <div
        className={clsx(
          "absolute right-0 top-0 h-full w-full sm:w-[400px]",
          "bg-gradient-to-b from-background via-background/95 to-background",
          "shadow-2xl border-l border-white/10",
          "transition-transform duration-500 ease-out",
          togglestate ? "translate-x-0" : "translate-x-full",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-my-main/10 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag className="h-7 w-7 text-my-main" />
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-my-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-my-main to-my-secondary bg-clip-text text-transparent">
                  {t("سلة التسوق", "Your Cart")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {products.length}{" "}
                  {t("منتج", products.length === 1 ? "item" : "items")}
                </p>
              </div>
            </div>

            <Button
              aria-label="close"
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-white/10 hover:text-my-main"
              onClick={closeSidebar}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Free Shipping */}
        {subtotal < FREE_SHIPPING_THRESHOLD && (
          <div className="px-6 py-4 border-b border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium flex items-center gap-2">
                <Truck className="h-4 w-4 text-my-main" />
                {t(
                  `أضف $${remaining.toFixed(2)} للشحن المجاني`,
                  `Add $${remaining.toFixed(2)} for free shipping`,
                )}
              </span>
              <span className="text-sm text-my-main font-semibold">
                {progress.toFixed(0)}%
              </span>
            </div>

            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-my-main to-my-secondary rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Security */}
        <div className="px-6 py-3 border-b border-white/5">
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <Badge icon={Shield} color="green" text={t("دفع آمن", "Secure")} />
            <Badge icon={Truck} color="blue" text={t("شحن سريع", "Fast")} />
            <Badge
              icon={CreditCard}
              color="purple"
              text={t("إرجاع", "Returns")}
            />
          </div>
        </div>

        {/* Items */}
        <div className="h-[calc(100vh-320px)] overflow-y-auto p-6">
          {!showContent ? (
            <Skeleton />
          ) : products.length === 0 ? (
            <EmptyState t={t} closeSidebar={closeSidebar} />
          ) : (
            <div className="space-y-6">
              {products.map((item, index) => (
                <Sideitem
                  key={`${item.id || item.name_ar}-${index}`}
                  ar={ar}
                  CartItem={item}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-background/95 backdrop-blur-sm p-6 space-y-4">
          <Summary
            t={t}
            subtotal={subtotal}
            shipping={shipping}
            finalTotal={finalTotal}
          />

          <div className="space-y-3">
            <Link href={`/${lang}/cart`} onClick={closeSidebar}>
              <Button
                variant="outline"
                className="w-full h-12 border-white/20 hover:border-my-main/50"
              >
                {t("عرض السلة", "View Cart")}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href={`/${lang}/checkout`} onClick={closeSidebar}>
              <Button className="w-full h-12 bg-gradient-to-r from-my-main to-my-secondary text-black font-bold">
                <CreditCard className="mr-2 h-5 w-5" />
                {t("الدفع", "Checkout")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Small helpers (UI unchanged) ---------- */

const Badge = ({ icon: Icon, color, text }: any) => (
  <div className="flex items-center gap-1.5">
    <Icon className={`h-3.5 w-3.5 text-${color}-500`} />
    <span>{text}</span>
  </div>
);

const Skeleton = () => (
  <div className="space-y-4 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex gap-4">
        <div className="h-24 w-24 bg-white/5 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/5 rounded w-3/4" />
          <div className="h-3 bg-white/5 rounded w-1/2" />
          <div className="h-4 bg-white/5 rounded w-1/4" />
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = ({ t, closeSidebar }: any) => (
  <div className="text-center py-16">
    <ShoppingBag className="mx-auto h-12 w-12 text-my-main/40 mb-6" />
    <h3 className="text-xl font-semibold mb-2">
      {t("سلة التسوق فارغة", "Cart is Empty")}
    </h3>
    <Button onClick={closeSidebar}>
      {t("تصفح المنتجات", "Browse Products")}
    </Button>
  </div>
);

const Summary = ({ t, subtotal, shipping, finalTotal }: any) => (
  <div className="space-y-3">
    <div className="flex justify-between">
      <span className="text-muted-foreground">{t("المجموع", "Subtotal")}</span>
      <span className="font-semibold">${subtotal.toFixed(2)}</span>
    </div>

    <div className="flex justify-between items-center pt-3 border-t border-white/10">
      <span className="text-xl font-bold">{t("الإجمالي", "Total")}</span>
      <span className="text-2xl font-bold bg-gradient-to-r from-my-main to-my-secondary bg-clip-text text-transparent">
        ${finalTotal.toFixed(2)}
      </span>
    </div>
  </div>
);

export default SideCart;
