import "../globals.css";

import { MyCarousel } from "@/components/carousel/Carousel";

import { Separator } from "@radix-ui/react-select";

import { Metadata } from "next";
import dynamic from "next/dynamic";
import Loading from "./loading";
const LazyFirst8Products = dynamic(
  () => import("@/components/lazyProducts/First8Products"),
  {
    ssr: true,
    loading: () => <Loading />,
  },
);

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
    { loading: () => <Loading /> },
  );
  const Banner = dynamic(() => import("@/components/Banner"), {
    loading: () => <Loading />,
  });

  return (
    <main>
      <div className="mx-auto p-6">
        <MyCarousel />
        <FeaturedProduct lang={lang} />
        <h2 className="text-4xl font-semibold text-center my-6">
          {lang === "ar" ? "احدث منتجاتنا" : "Our Latest Products"}
          <Separator className="w-28 h-0.5 bg-gradient-to-r from-my-main to-my-secondary mt-2 mx-auto" />
        </h2>
        <LazyFirst8Products lang={lang} />
        <Banner lang={lang} />
      </div>
    </main>
  );
}
