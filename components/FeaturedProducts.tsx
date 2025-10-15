import React from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: 1,
    image: "/products/camera.png",
    title: {
      en: "Capture Every Moment",
      ar: "التقط كل لحظة",
    },
    link: {
      en: "/en/products/product/cm84m00pp006bvg2knn74n1fc",
      ar: "/ar/products/product/cm84m00pp006bvg2knn74n1fc",
    },
    description: {
      en: "Professional cameras capture stunning photos and videos, perfect for both beginners and experts.",
      ar: "كاميرات احترافية مصممة لالتقاط صور وفيديوهات مذهلة، مثالية لكل من المبتدئين والخبراء في التصوير.",
    },
    badgeLeft: "New",
    badgeRight: "Sale",
  },
  {
    id: 2,
    image: "/products/jbl.png",
    title: {
      en: "Quality Quran Sound",
      ar: "جودة صوت قرآن",
    },
    link: {
      en: "/en/products/product/cm84m00pp006avg2k9ty963ji",
      ar: "/ar/products/product/cm84m00pp006avg2k9ty963ji",
    },
    description: {
      en: "Experience unmatched sound quality with JBL audio devices, delivering crystal-clear Quran recitations and immersive listening experiences.",
      ar: "جرب جودة صوت لا مثيل لها مع أجهزة JBL الصوتية، التي توفر تلاوات قرآنية واضحة وتجارب استماع غامرة.",
    },
    badgeLeft: "Popular",
    badgeRight: "Limited",
  },
  {
    id: 3,
    image: "/products/bose.png",
    title: {
      en: "BOSE Headphones Sound",
      ar: "سماعات Bose الصوتية",
    },
    link: {
      en: "/en/products/product/cm84m00pp006fvg2kbosehphone",
      ar: "/ar/products/product/cm84m00pp006fvg2kbosehphone",
    },
    description: {
      en: "Immerse yourself in the ultimate sound experience with Bose headphones, offering unparalleled audio quality and comfort for all-day use.",
      ar: "اغمر نفسك في تجربة صوتية فائقة مع سماعات Bose، التي توفر جودة صوت وراحة لا مثيل لها.",
    },
    badgeLeft: "Trending",
    badgeRight: "Exclusive",
  },
];

const FeaturedProduct = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const ar = lang === "ar";

  return (
    <div className="mt-14">
      {/* Section Title */}
      <div className="flex flex-col items-center">
        <p className="text-3xl md:text-5xl font-medium text-my-main">
          {lang === "ar" ? "منتجات مميزة" : "Featured Products"}
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8 lg:gap-14 mt-8 px-4">
        {products.map(
          (
            { id, image, title, link, description, badgeLeft, badgeRight },
            index
          ) => (
            <div
              key={id}
              className="relative flex flex-col group bg-card rounded-lg overflow-hidden shadow-lg animate-slide-up-fade transition-transform hover:scale-105"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {/* Top-left Badge */}
              {badgeLeft && (
                <div className="absolute top-2 left-2 bg-my-secondary text-background px-2 py-1 rounded-lg text-xs font-bold z-10">
                  {badgeLeft}
                </div>
              )}

              {/* Top-right Badge */}
              {badgeRight && (
                <div className="absolute top-2 right-2 bg-my-main text-background px-2 py-1 rounded-lg text-xs font-bold z-10">
                  {badgeRight}
                </div>
              )}

              {/* Product Image */}
              <Image
                src={image}
                alt={title[lang as keyof typeof title]}
                width={300}
                height={300}
                className="object-contain m-auto p-4 transition duration-300 group-hover:brightness-90"
              />

              {/* Product Info */}
              <div className="px-4 pb-4 flex flex-col gap-2">
                <p className="font-semibold text-xl lg:text-2xl text-my-main">
                  {title[lang as keyof typeof title]}
                </p>
                <p className="text-sm lg:text-base text-foreground leading-6">
                  {description[lang as keyof typeof description]}
                </p>

                <Link
                  href={link[lang as keyof typeof link] || "/products"}
                  className="inline-flex w-fit items-center gap-2 bg-my-main text-black  rounded-lg px-4 py-2 mt-2 transition-colors "
                >
                  {lang === "ar" ? "اشتري الآن" : "Buy now"}{" "}
                  <ShoppingBag size={18} />
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FeaturedProduct;
