import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const products = [
  {
    id: 1,
    image: "/products/camera.png",
    title: { en: "Capture Every Moment", ar: "التقط كل لحظة" },
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
    title: { en: "Quality Quran Sound", ar: "جودة صوت قرآن" },
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
    title: { en: "BOSE Headphones Sound", ar: "سماعات Bose الصوتية" },
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
      <h2 className="text-3xl md:text-5xl font-medium text-my-main text-center">
        {ar ? "منتجات مميزة" : "Featured Products"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8 lg:gap-14 mt-8 px-4">
        {products.map(
          ({ id, image, title, link, description, badgeLeft, badgeRight }) => (
            <Card
              key={id}
              className="group flex flex-col justify-between relative hover:scale-105 transition-transform overflow-hidden shadow-lg"
            >
              <div className="absolute rounded-lg top-2 left-2 bg-my-secondary text-background px-2 py-1 text-xs font-bold z-10">
                {badgeLeft}
              </div>
              <div className="absolute rounded top-2 right-2 bg-my-main text-background px-2 py-1 text-xs font-bold z-10">
                {badgeRight}
              </div>

              <CardContent className="flex flex-col items-center ">
                <Image
                  src={image}
                  alt={title[lang as keyof typeof title]}
                  width={300}
                  height={300}
                  className="object-contain  transition duration-300 group-hover:brightness-90"
                />
              </CardContent>

              <CardFooter className="flex justify-center flex-col gap-3">
                <p className="font-semibold text-xl lg:text-2xl text-my-main  text-center">
                  {title[lang as keyof typeof title]}
                </p>
                <p className="text-sm lg:text-base text-foreground  text-center">
                  {description[lang as keyof typeof description]}
                </p>
                <Link
                  href={link[lang as keyof typeof link] || "/products"}
                  className="inline-flex items-center gap-2 bg-my-main text-black px-4 py-2 transition-colors hover:opacity-90"
                >
                  {ar ? "اشتري الآن" : "Buy now"} <ShoppingBag size={18} />
                </Link>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default FeaturedProduct;
