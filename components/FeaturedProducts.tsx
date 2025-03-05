import React from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import Link from "./Link";

const products = [
  {
    id: 2,
    image: "/featured-images/camera.png",
    title: {
      en: "Capture Every Moment",
      ar: "التقط كل لحظة",
    },
    description: {
      en: "Professional cameras for stunning photography and videography.",
      ar: "كاميرات احترافية لالتقاط صور وفيديوهات مذهلة.",
    },
  },
  {
    id: 1,
    image: "/featured-images/lab2.png",
    title: {
      en: "Power in Every Pixel",
      ar: "القوة في كل بكسل",
    },
    description: {
      en: "Experience the ultimate performance with our latest laptops.",
      ar: "جرب الأداء الفائق مع أحدث أجهزة اللابتوب لدينا.",
    },
  },
  {
    id: 3,
    image: "/featured-images/headphone.png",
    title: {
      en: "Headphones",
      ar: "سماعات",
    },
    description: {
      en: "Experience the ultimate sound with our high-end headphones.",
      ar: "جرب الأداء الفائق مع سماعات احترافية لدينا.",
    },
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
    <div className="mt-14 w-full lg:w-[80%] mx-auto">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">
          {lang === "ar" ? "منتجات مميزة" : "Featured Products"}
        </p>
        <div className="w-28 h-0.5 bg-gradient-to-r from-green-500 to-blue-700 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group bg-muted ">
            <Image
              src={image}
              alt={title[lang as keyof typeof title]}
              width={500}
              height={500}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover p-4"
            />
            <div
              className={`group-hover:-translate-y-4 transition duration-300 absolute bottom-8 ${
                ar ? "right-8" : "left-8"
              } space-y-2`}
            >
              <p className="font-medium text-xl lg:text-3xl bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                {title[lang as keyof typeof title]}
              </p>
              <p className="text-lg font-bold lg:text-base leading-5 max-w-60 bg-gradient-to-r from-blue-500 to-red-500 text-transparent bg-clip-text">
                {description[lang as keyof typeof description]}
              </p>
              <Link
                href={ar ? "/ar/products" : "/en/products"}
                className="w-fit text-white flex items-center gap-1.5 bg-gradient-to-r from-green-500 to-blue-700 px-4 py-2 rounded "
              >
                {lang === "ar" ? "اشتري الآن" : "Buy now"} <ShoppingBag />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
