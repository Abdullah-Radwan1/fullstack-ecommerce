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
      id: 2,
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
    {
      id: 3,
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
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full relative overflow-hidden"
    >
      <CarouselContent dir="ltr">
        {sliderData.map((slide) => (
          <CarouselItem key={slide.id} className="bg-card">
            <div
              dir={ar ? "rtl" : "ltr"}
              className="relative flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-14 py-10 md:py-16 gap-8"
            >
              {/* Text Section - أصبحت متساوية مع الصورة */}
              <div
                className="max-w-xl animate-fade-in"
                style={{
                  animationDelay: "0.3s",
                  animationDuration: "0.8s",
                  animationFillMode: "forwards",
                  opacity: 0,
                }}
              >
                <p className="text-sm md:text-base font-bold bg-clip-text text-my-main pb-1 uppercase tracking-wide">
                  {slide.offer[lang as keyof typeof slide.offer]}
                </p>
                <h1 className="text-2xl md:text-4xl font-semibold leading-snug text-foreground mb-2">
                  {slide.title[lang as keyof typeof slide.title]}
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-4">
                  {slide.description[lang as keyof typeof slide.description]}
                </p>
                <div className="flex items-center mt-4 gap-3">
                  <Link
                    href={slide.link}
                    className="font-medium rounded bg-accent text-black px-4 py-2 hover:bg-accent/90 transition-colors"
                  >
                    {slide.buttonText1[lang as keyof typeof slide.buttonText1]}
                  </Link>
                  <button
                    name="arrow"
                    className="flex items-center gap-2 text-my-main font-medium hover:text-my-main/80 transition-colors"
                  >
                    {slide.buttonText2[lang as keyof typeof slide.buttonText2]}
                    {ar ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                  </button>
                </div>
              </div>

              {/* Image Section */}
              <div
                className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[420px] animate-slide-up"
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
                  priority
                  className="object-contain h-full"
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
