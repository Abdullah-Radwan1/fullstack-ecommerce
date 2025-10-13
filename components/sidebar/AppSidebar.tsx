"use client";

import React, { useEffect, useState, useMemo } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useCartStore, { useSidebarStore } from "@/zustand/store";
import Sideitem from "./sideItems";
import clsx from "clsx";
import { useParams } from "next/navigation";

const SideCart = () => {
  const { togglestate, setTogglestate } = useSidebarStore();
  const products = useCartStore((state) => state.items);
  const totalAmount = () => useCartStore.getState().getTotalPrice();

  const [isMounted, setIsMounted] = useState(false);
  const { lang } = useParams();
  const ar = lang === "ar";
  const renderedProducts = useMemo(() => {
    if (products.length === 0) {
      return (
        <h3 className="text-center pt-32 text-gray-600">
          {ar ? "لا يوجد منتجات" : "There are no items yet"}
        </h3>
      );
    }

    return products.map((item) => <Sideitem key={item.name} CartItem={item} />);
  }, [products, ar]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Optional: Defer rendering Sideitems until animation starts
  const [showItems, setShowItems] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (togglestate) {
      timer = setTimeout(() => setShowItems(true), 100); // Wait for slide-in animation
    } else {
      setShowItems(false);
    }
    return () => clearTimeout(timer);
  }, [togglestate]);

  if (!isMounted) return null;

  return (
    <div
      dir="ltr"
      data-testid="SideCart"
      className={clsx(
        "fixed inset-0 z-50 flex justify-end bg-black/40 duration-300 transition-opacity",
        {
          "opacity-100 pointer-events-auto": togglestate,
          "opacity-0 pointer-events-none": !togglestate,
        }
      )}
      onClick={() => setTogglestate(false)} // 👈 close when clicking outside
    >
      <div
        className={clsx(
          "relative w-[80%] sm:w-[350px] h-full bg-background/90 backdrop-blur-md shadow-lg transition-transform duration-300 ease-in-out transform will-change-transform",
          {
            "translate-x-0": togglestate,
            "translate-x-full": !togglestate,
          }
        )}
        onClick={(e) => e.stopPropagation()} // 👈 stop clicks *inside* sidebar from closing it
      >
        <Button
          className="absolute top-4 right-4 z-10 bg-red-500 text-white hover:text-black"
          onClick={() => setTogglestate(false)}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="p-4 overflow-y-auto h-full mb-24 mt-6">
          {!showItems ? (
            <h3 className="text-center pt-32 text-gray-600 animate-pulse">
              {ar ? "جاري التحميل..." : "Loading..."}
            </h3>
          ) : products.length === 0 ? (
            <h3 className="text-center pt-32 text-gray-600">
              {ar ? "لا يوجد منتجات" : "There are no items yet"}
            </h3>
          ) : (
            renderedProducts
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t flex justify-between items-center bg-background">
          <h5 className="text-lg font-medium ">
            {ar ? "الإجمالي :" : "Total :"}{" "}
            <span className="text-orange-600">${totalAmount()}</span>
          </h5>
          <Link onClick={() => setTogglestate(false)} href="/checkout">
            <Button>{ar ? "الدفع" : "Checkout"}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideCart;
