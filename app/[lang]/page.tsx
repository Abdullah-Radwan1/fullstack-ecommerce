import Banner from "@/components/Banner";
import { MyCarousel } from "@/components/carousel/Carousel";
import FeaturedProduct from "@/components/FeaturedProducts";

import ProductCard from "@/components/productCard";

import { first_8_products } from "@/lib/Functions";

import { Separator } from "@radix-ui/react-select";

import { Metadata } from "next";

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
      {
        rel: "icon",
        url: "/ecommerce.png",
        media: "(prefers-color-scheme: dark)",
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
          <Separator className="w-28 h-0.5 bg-gradient-to-r from-green-500 to-blue-700 mt-2 mx-auto"></Separator>
        </h2>

        <div className=" mx-auto grid  sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {ten_products.map((product) => (
            <ProductCard lang={lang} key={product.id} product={product} />
          ))}
        </div>
        <Banner params={params} />
      </div>
    </main>
  );
}
//first commit
