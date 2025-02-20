import React from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

const products = [
  {
    id: 1,
    image: "/featured-images/airpods.png",
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
    id: 2,
    image: "/featured-images/lab2.png",
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
    id: 3,
    image: "/featured-images/screen.png",
    title: {
      en: "Unmatched Sound Quality",
      ar: "جودة صوت لا مثيل لها",
    },
    description: {
      en: "Immerse yourself in crystal-clear audio with premium AirPods.",
      ar: "اغمر نفسك في صوت نقي مع AirPods المميزة.",
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
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">
          {lang === "ar" ? "منتجات مميزة" : "Featured Products"}
        </p>
        <div className="w-28 h-0.5 bg-gradient-to-r from-green-500 to-blue-700 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group bg-muted">
            <Image
              src={image}
              alt={title[lang as keyof typeof title]}
              width={500}
              height={500}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            />
            <div
              className={`group-hover:-translate-y-4 transition duration-300 absolute bottom-8 ${
                ar ? "right-8" : "left-8"
              } space-y-2`}
            >
              <p className="font-medium text-xl lg:text-2xl ">
                {title[lang as keyof typeof title]}
              </p>
              <p className="text-sm lg:text-base leading-5 max-w-60">
                {description[lang as keyof typeof description]}
              </p>
              <button className=" text-white flex items-center gap-1.5 bg-gradient-to-r from-green-500 to-blue-700 px-4 py-2 rounded ">
                {lang === "ar" ? "اشتري الآن" : "Buy now"} <ShoppingBag />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
