"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Sparkles, Zap, Flame, Crown } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    offer: { en: "40% Off", ar: "خصم 40%" },
    buttonText: { en: "Order Now", ar: "اطلب الآن" },
    imgSrc: "/slider-images/3labs.png",
    link: "/shop",
    badge: "Exclusive",
    icon: Crown,
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
    offer: { en: "30% Off", ar: "خصم 30%" },
    buttonText: { en: "Shop Now", ar: "اشتري الآن" },
    imgSrc: "/products/bose.png",
    link: "/shop/product/cm84m00pp006fvg2kbosehphone",
    badge: "Hot",
    icon: Flame,
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
    offer: { en: "Limited Stock", ar: "كمية محدودة" },
    buttonText: { en: "Shop Now", ar: "تسوق الآن" },
    imgSrc: "/slider-images/gaming_monitor2.png",
    link: "/shop",
    badge: "New",
    icon: Zap,
  },
];

export function MyCarousel() {
  const autoplay = React.useRef(Autoplay({ delay: 5000 }));
  const params = useParams();
  const lang: Lang = params.lang === "ar" ? "ar" : "en";

  return (
    <div
      dir="ltr"
      className="relative overflow-hidden rounded-xl border border-border bg-card"
    >
      {/* Accent top line – uses theme gold */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-my-main via-accent to-my-secondary shadow-[0_0_12px_var(--my-main)]" />

      <Carousel
        plugins={[autoplay.current]}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {sliderData.map((slide) => {
            const Icon = slide.icon;

            return (
              <CarouselItem key={slide.id}>
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12 p-6 lg:p-10">
                  {/* TEXT */}
                  <div className="flex-1 space-y-6 text-center lg:text-start">
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                      <Badge className="bg-gradient-to-r from-my-main to-my-secondary text-background shadow-[0_0_10px_var(--my-main)]">
                        <Icon className="w-3 h-3 mr-1" />
                        {slide.badge}
                      </Badge>

                      <Badge
                        variant="outline"
                        className="border-my-main/40 text-my-main"
                      >
                        {slide.offer[lang]}
                      </Badge>
                    </div>

                    <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold leading-tight">
                      {slide.title[lang]}
                    </h1>

                    <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
                      {slide.description[lang]}
                    </p>

                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-my-main to-my-secondary text-background shadow-[0_0_25px_var(--my-main)] hover:shadow-[0_0_40px_var(--my-main)]"
                    >
                      <Link
                        href={slide.link}
                        className="flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        {slide.buttonText[lang]}
                      </Link>
                    </Button>
                  </div>

                  {/* IMAGE */}
                  <div className="flex-1 relative w-full">
                    {/* Theme-aware golden glow */}
                    <div className="absolute inset-0 rounded-full blur-2xl opacity-70 bg-[radial-gradient(circle_at_center,var(--my-main)_0%,transparent_55%)]" />
                    <div className="absolute inset-0 rounded-full  opacity-30" />

                    <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-[4/3] sm:aspect-square">
                      <Image
                        src={slide.imgSrc}
                        alt={slide.title.en}
                        fill
                        priority
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 40vw"
                        className="object-contain "
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Navigation */}
        <div className="flex items-center justify-between px-6 pb-6">
          <CarouselPrevious className="static translate-y-0 border-my-main/30 hover:border-my-main hover:bg-my-main/10 shadow-[0_0_12px_var(--my-main)]" />
          <CarouselNext className="static translate-y-0 border-my-main/30 hover:border-my-main hover:bg-my-main/10 shadow-[0_0_12px_var(--my-main)]" />
        </div>
      </Carousel>

      {/* Bottom depth fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/70 to-transparent" />
    </div>
  );
}
