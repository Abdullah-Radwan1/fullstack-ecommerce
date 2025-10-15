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

export function MyCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 3000 }));
  const { lang } = useParams();
  const ar = lang === "ar";

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
      buttonText1: { en: "Shop Now", ar: "اشتري الآن" },
      buttonText2: { en: "Find More", ar: "اكتشف المزيد" },
      imgSrc: "/products/bose.png",
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
      buttonText2: { en: "Explore!", ar: "اكتشف!" },
      imgSrc: "/slider-images/gaming_monitor2-transformed.png",
    },
    {
      id: 3,
      title: {
        en: "Unleash Creativity and Power - 3Labs Workstation for Professionals!",
        ar: "أطلق العنان للإبداع والقوة - عروض اللابات الحصرية للمحترفين!",
      },
      offer: { en: "Exclusive Deal 40% Off", ar: "صفقة حصرية خصم 40%" },
      buttonText1: { en: "Order Now", ar: "اطلب الآن" },
      buttonText2: { en: "Learn More", ar: "تعرف أكثر" },
      imgSrc: "/slider-images/3labs.png",
    },
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full bg-white relative overflow-hidden"
    >
      <CarouselContent dir="ltr">
        {sliderData.map((slide, index) => (
          <CarouselItem key={slide.id} className="basis-full">
            <div
              dir={ar ? "rtl" : "ltr"}
              className="relative flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-14 py-10 md:py-16"
            >
              {/* Text Section */}
              <div
                className="max-w-xl animate-fade-in"
                style={{
                  animationDelay: "0.3s",
                  animationDuration: "0.8s",
                  animationFillMode: "forwards",
                  opacity: 0,
                }}
              >
                <p className="text-sm md:text-base font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent pb-1 uppercase tracking-wide">
                  {slide.offer[lang as keyof typeof slide.offer]}
                </p>
                <h1 className="text-2xl md:text-4xl font-semibold leading-snug text-gray-800 mb-4">
                  {slide.title[lang as keyof typeof slide.title]}
                </h1>
                <div className="flex items-center mt-4 gap-3">
                  <Link
                    href={ar ? "/ar/products" : "/en/products"}
                    className="bg-gradient-to-r from-green-600 to-green-400 text-white font-medium rounded-lg px-4 py-2 transition-transform hover:scale-105"
                  >
                    {slide.buttonText1[lang as keyof typeof slide.buttonText1]}
                  </Link>
                  <button className="group flex items-center gap-2 text-green-600 font-medium hover:underline">
                    {slide.buttonText2[lang as keyof typeof slide.buttonText2]}
                    {ar ? (
                      <ArrowLeft className="transition-transform group-hover:translate-x-[-4px]" />
                    ) : (
                      <ArrowRight className="transition-transform group-hover:translate-x-[4px]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Image Section */}
              <div
                className="relative w-full h-[280px] sm:h-[350px] md:h-[420px] lg:h-[520px] animate-slide-up"
                style={{
                  animationDelay: "0.1s",
                  animationDuration: "0.9s",
                  animationFillMode: "forwards",
                  opacity: 0,
                }}
              >
                <Image
                  src={slide.imgSrc}
                  alt={`Slide ${slide.id}`}
                  fill
                  priority={index === 0}
                  className="object-contain"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slide-up {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.9s ease forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.9s ease forwards;
        }
      `}</style>
    </Carousel>
  );
}
