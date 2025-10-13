import React from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
const products = [
  {
    id: 2,
    image: "/featured-images/camera.png",
    title: {
      en: "Capture Every Moment",
      ar: "التقط كل لحظة",
    },
    description: {
      en: "Professional cameras  capture stunning photos and videos, perfect for both beginners and experts.",
      ar: "كاميرات احترافية مصممة لالتقاط صور وفيديوهات مذهلة، مثالية لكل من المبتدئين والخبراء في التصوير.",
    },
    badgeLeft: "New", // Badge for top-left corner
    badgeRight: "Sale", // Badge for top-right corner
  },
  {
    id: 1,
    image: "/featured-images/jbl.png",
    title: {
      en: "Quality Quran Sound",
      ar: "جودة صوت قرآن",
    },
    description: {
      en: "Experience unmatched sound quality with JBL audio devices, delivering crystal-clear Quran recitations and immersive listening experiences.",
      ar: "جرب جودة صوت لا مثيل لها مع أجهزة JBL الصوتية، التي توفر تلاوات قرآنية واضحة وتجارب استماع غامرة.",
    },
    badgeLeft: "Popular", // Badge for top-left corner
    badgeRight: "Limited", // Badge for top-right corner
  },
  {
    id: 3,
    image: "/featured-images/headphone.png",
    title: {
      en: "BOSE Headphones Sound",
      ar: "سماعات Bose الصوتية",
    },
    description: {
      en: "Immerse yourself in the ultimate sound experience with Bose headphones, offering unparalleled audio quality and comfort for all-day use.",
      ar: "اغمر نفسك في تجربة صوتية فائقة مع سماعات Bose، التي توفر جودة صوت وراحة لا مثيل لها  ",
    },
    badgeLeft: "Trending", // Badge for top-left corner
    badgeRight: "Exclusive", // Badge for top-right corner
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
    <div className="mt-14 ">
      <div className="flex flex-col items-center">
        <p className="text-3xl md:text-5xl font-medium text-red-500 ">
          {lang === "ar" ? "منتجات مميزة" : "Featured Products"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8 lg:gap-14 mt-8 px-4">
        {products.map(
          ({ id, image, title, description, badgeRight }, index) => (
            <div
              key={id}
              className="relative group bg-accent rounded-lg animate-slide-up-fade"
              style={{ animationDelay: `${index * 0.3}s` }} // <-- stagger each card by 0.5s
            >
              {badgeRight && (
                <div className="absolute top-[-2.5rem] right-0">
                  <div className="relative">
                    {/* Ribbon Image */}
                    <Image
                      alt="ribbon"
                      src={"/featured-images/rebbon.png"}
                      width={80}
                      height={80}
                      className="w-32 h-32"
                    />
                    {/* Text Overlay on Ribbon */}
                    <p className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold">
                      {badgeRight}
                    </p>
                  </div>
                </div>
              )}

              <Image
                src={image}
                alt={title[lang as keyof typeof title]}
                width={id === 1 ? 250 : 300}
                height={300}
                className="group-hover:brightness-75 transition duration-300 object-cover m-auto"
              />
              <div className="group-hover:-translate-y-4 transition duration-300 px-4 pb-4">
                <p className="font-medium text-xl lg:text-3xl text-red-500">
                  {title[lang as keyof typeof title]}
                </p>
                <p className="text-lg leading-7 py-2">
                  {description[lang as keyof typeof description]}
                </p>

                <Link
                  href={ar ? "/ar/products" : "/en/products"}
                  className="w-fit font-medium bg-red-500 text-white flex items-center gap-1.5 transition duration-200 rounded-lg p-2"
                >
                  {lang === "ar" ? "اشتري الآن" : "Buy now"} <ShoppingBag />
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
