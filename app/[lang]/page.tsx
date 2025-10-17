import "../globals.css";

import { MyCarousel } from "@/components/carousel/Carousel";

import ProductCard from "@/components/productCard";

import { first_8_products } from "@/lib/Functions";

import { Separator } from "@radix-ui/react-select";

import { Metadata } from "next";
import dynamic from "next/dynamic";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Vogue-Haven Store",
  description:
    "Welcome to Vogue Haven Ecommerce, the best online shopping destination.",
  icons: {
    icon: "/ecommerce.png",
    shortcut: "/ecommerce.png",
    apple: "/ecommerce.png",
    other: [
      {
        rel: "icon",
        url: "/ecommerce.png",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
};
export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const FeaturedProduct = dynamic(
    () => import("@/components/FeaturedProducts"),
    {
      loading: () => <Loading />,
    }
  );
  const Banner = dynamic(() => import("@/components/Banner"), {
    loading: () => <Loading />,
  });

  const ten_products = await first_8_products();

  return (
    <main>
      {/* Hero Section */}
      <MyCarousel />
      <FeaturedProduct params={params} />
      {/* Product Grid */}
      <div className=" mx-auto p-6">
        <h2 className="text-4xl font-semibold text-center  mb-6">
          {lang === "ar" ? "المنتجات" : "Products"}
          <Separator className="w-28 h-0.5 bg-gradient-to-r from-my-main to-my-secondary mt-2 mx-auto"></Separator>
        </h2>

        <div className=" mx-auto grid  sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {ten_products.map((product) => (
            <ProductCard lang={lang} key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Banner params={params} />
    </main>
  );
}
