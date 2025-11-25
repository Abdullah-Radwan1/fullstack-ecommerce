"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Lang = "en" | "ar";
const sliderData = [
  {
    id: 1,
    title: {
      en: "Unleash Creativity and Power - 3Labs Workstation for Professionals!",
      ar: "أطلق العنان للإبداع والقوة - عروض اللابات الحصرية للمحترفين!",
    },
    description: {
      en: "Powerful workstation optimized for designers, developers, and content creators.",
      ar: "كمبيوتر قوي مخصص للمصممين والمطورين ومنشئي المحتوى.",
    },
    offer: { en: "Exclusive Deal 40% Off", ar: "صفقة حصرية خصم 40%" },
    buttonText1: { en: "Order Now", ar: "اطلب الآن" },
    buttonText2: { en: "Learn More", ar: "تعرف أكثر" },
    imgSrc: "/slider-images/3labs.png",
    link: "/products",
  },
  {
    id: 2,
    title: {
      en: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      ar: "جرب الصوت النقي - سماعاتك المثالية في انتظارك!",
    },
    description: {
      en: "Enjoy crystal-clear audio with noise-cancelling technology and long battery life.",
      ar: "استمتع بصوت واضح مع تقنية إلغاء الضوضاء وعمر بطارية طويل.",
    },
    offer: {
      en: "Limited Time Offer 30% Off",
      ar: "عرض لفترة محدودة خصم 30%",
    },
    buttonText1: { en: "Shop Now", ar: "اشتري الآن" },
    buttonText2: { en: "Find More", ar: "اكتشف المزيد" },
    imgSrc: "/products/bose.png",
    link: "/products/product/cm84m00pp006fvg2kbosehphone",
  },
  {
    id: 3,
    title: {
      en: "Ghost Gaming Experience - Discover the Ultimate Gaming Monitor!",
      ar: "ارتقِ بتجربة الألعاب الخاصة بك - اكتشف أفضل شاشة ألعاب!",
    },
    description: {
      en: "High refresh rate and ultra-wide screen for the ultimate gaming experience.",
      ar: "معدل تحديث عالي وشاشة واسعة للغاية لتجربة ألعاب مثالية.",
    },
    offer: {
      en: "Hurry up, limited stock available!",
      ar: "أسرع، الكمية محدودة!",
    },
    buttonText1: { en: "Shop Now", ar: "تسوق الآن" },
    buttonText2: { en: "Explore!", ar: "اكتشف!" },
    imgSrc: "/slider-images/gaming_monitor2.png",
    link: "/products",
  },
];
export function MyCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 3000 }));
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const params = useParams();
  const lang: Lang = params.lang === "ar" ? "ar" : "en";
  const ar = lang === "ar";

  return (
    <Carousel
      className={`transform transition-all duration-200 ease-out 
    ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-y-5"}`}
      plugins={[plugin.current]}
    >
      <CarouselContent dir="ltr">
        {sliderData.map((slide) => (
          <CarouselItem key={slide.id} className="bg-card">
            <div
              dir={ar ? "rtl" : "ltr"}
              className="relative flex flex-col-reverse lg:flex-row items-center justify-between p-8 gap-8"
            >
              {/* TEXT */}
              <div className="max-w-xl">
                <p className="text-sm md:text-base font-bold text-my-main pb-1 uppercase tracking-wide">
                  {slide.offer[lang]}
                </p>

                <h1 className="text-2xl md:text-4xl font-semibold leading-snug text-foreground mb-2">
                  {slide.title[lang]}
                </h1>

                <p className="text-base md:text-lg text-muted-foreground mb-4">
                  {slide.description[lang]}
                </p>

                <div className="flex items-center mt-4 gap-3">
                  <Link
                    href={slide.link}
                    className="font-medium rounded bg-accent text-black px-4 py-2"
                  >
                    {slide.buttonText1[lang]}
                  </Link>

                  <button className="flex items-center gap-2 text-my-main font-medium">
                    {slide.buttonText2[lang]}
                    {ar ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                  </button>
                </div>
              </div>

              {/* IMAGE */}
              <div className="relative w-full md:h-[350px] lg:h-[350px]">
                <Image
                  src={slide.imgSrc}
                  alt={`Slide ${slide.id}`}
                  fill
                  priority
                  className="object-contain h-full"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
