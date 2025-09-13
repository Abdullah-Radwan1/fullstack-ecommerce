"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "../Link";
import "../../app/animations.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function MyCarousel() {
  const { lang } = useParams();
  const ar = lang === "ar";

  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  const sliderData = [
    {
      id: 1,
      title: {
        en: "Experience Pure Sound - Your Perfect Headphones Awaits!",
        ar: "جرب الصوت النقي - سماعاتك المثالية في انتظارك!",
      },
      offer: {
        en: "Limited Time Offer 30% Off",
        ar: "عرض لفترة محدودة خصم 30%",
      },
      buttonText1: { en: "Buy now", ar: "اشتري الآن" },
      buttonText2: { en: "Find more", ar: "اكتشف المزيد" },
      imgSrc: "/slider-images/headphone.png",
    },
    {
      id: 2,
      title: {
        en: "Ghost Gaming Experience - Discover the Ultimate Gaming Monitor!",
        ar: "ارتقِ بتجربة الألعاب الخاصة بك - اكتشف أفضل شاشة ألعاب!",
      },
      offer: {
        en: "Hurry up, limited stock available!",
        ar: "أسرع، الكمية محدودة!",
      },
      buttonText1: { en: "Shop Now", ar: "تسوق الآن" },
      buttonText2: { en: "Explore !", ar: "اكتشف !" },
      imgSrc: "/slider-images/gaming_monitor2-transformed.png",
    },
    {
      id: 3,
      title: {
        en: "Unleash Creativity and Power - 3Labs Workstation for Professionals!",
        ar: "أطلق العنان للإبداع والقوة -  عروض اللابات الحصريه للمحترفين!",
      },
      offer: { en: "Exclusive Deal 40% Off", ar: "صفقة حصرية خصم 40%" },
      buttonText1: { en: "Order Now", ar: "اطلب الآن" },
      buttonText2: { en: "Learn More", ar: "تعرف أكثر" },
      imgSrc: "/slider-images/3labs.png",
    },
  ];

  return (
    <Carousel
      dir={"ltr"}
      plugins={[plugin.current]}
      className=" bg-muted mt-8 "
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="animate-slide-up-fade ">
        {sliderData.map((slide, index) => (
          <CarouselItem key={slide.id}>
            <div
              dir={ar ? "rtl" : "ltr"}
              className="flex flex-col-reverse lg:flex-row items-center justify-between md:px-14 px-5 py-4   "
            >
              {/* Text content */}
              <div className="pb-4 lg:pb-0">
                <p className="md:text-base font-bold bg-gradient-to-r from-green-500 to-blue-700 bg-clip-text text-transparent pb-1">
                  {slide.offer[lang as keyof typeof slide.offer]}
                </p>
                <h1 className="max-w-lg md:text-3xl md:leading-[48px] text-lg font-semibold">
                  {slide.title[lang as keyof typeof slide.title]}
                </h1>
                <div className="flex items-center mt-4 gap-2 text-center">
                  <Link
                    href={ar ? "/ar/products" : "/en/products"}
                    className="bg-gradient-to-r text-center from-green-500 to-blue-700 rounded-lg text-white font-medium xl:px-4 px-2 py-2"
                  >
                    {slide.buttonText1[lang as keyof typeof slide.buttonText1]}
                  </Link>
                  <button className="group flex items-center gap-2 p-2 font-medium max-h-2">
                    {slide.buttonText2[lang as keyof typeof slide.buttonText2]}
                    {ar ? <ArrowLeft /> : <ArrowRight />}
                  </button>
                </div>
              </div>
              {/* Image */}
              <div className="flex items-center flex-1 justify-center">
                <Image
                  className="object-contain"
                  src={slide.imgSrc}
                  width={index === 1 ? 400 : 300}
                  height={300}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
