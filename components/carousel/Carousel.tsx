"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Zap,
  Flame,
  Crown,
} from "lucide-react";
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
    buttonText1: { en: "Order Now", ar: "اطلب الآن" },
    imgSrc: "/slider-images/3labs.png",
    link: "/products",
    badge: "Exclusive",
    icon: Crown,
    color: "from-blue-500/10 to-cyan-500/10",
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
    buttonText1: { en: "Shop Now", ar: "اشتري الآن" },
    imgSrc: "/products/bose.png",
    link: "/products/product/cm84m00pp006fvg2kbosehphone",
    badge: "Hot",
    icon: Flame,
    color: "from-red-500/10 to-orange-500/10",
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
    buttonText1: { en: "Shop Now", ar: "تسوق الآن" },
    imgSrc: "/slider-images/gaming_monitor2.png",
    link: "/products",
    badge: "New",
    icon: Zap,
    color: "from-purple-500/10 to-pink-500/10",
  },
];

export function MyCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 5000 }));
  const params = useParams();
  const lang: Lang = params.lang === "ar" ? "ar" : "en";
  const ar = lang === "ar";

  return (
    <div className="relative rounded-xl border border-border bg-card overflow-hidden">
      {/* Accent Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-my-main to-my-secondary" />

      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {sliderData.map((slide) => {
            const Icon = slide.icon;
            return (
              <CarouselItem key={slide.id}>
                <div className="flex flex-col lg:flex-row items-center gap-8 p-6">
                  {/* Text Content */}
                  <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                      {/* Badge and Offer */}
                      <div className="flex items-center gap-3">
                        <Badge className="bg-gradient-to-r from-my-main to-my-secondary text-background">
                          <Icon className="w-3 h-3 mr-1" />
                          {slide.badge}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-my-main/50 text-my-main"
                        >
                          {slide.offer[lang]}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h1 className="text-3xl font-bold text-foreground">
                        {slide.title[lang]}
                      </h1>

                      {/* Description */}
                      <p className="text-muted-foreground text-lg">
                        {slide.description[lang]}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-my-main to-my-secondary text-background hover:shadow-md"
                    >
                      <Link
                        href={slide.link}
                        className="flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        {slide.buttonText1[lang]}
                      </Link>
                    </Button>
                  </div>

                  {/* Image with Background Glow */}
                  <div className="flex-1 relative">
                    <div
                      className={`absolute inset-0 rounded-full ${slide.color} blur-xl opacity-50`}
                    />
                    <div className="relative w-full aspect-square max-w-md mx-auto">
                      <Image
                        src={slide.imgSrc}
                        alt={`Slide ${slide.id}`}
                        fill
                        className="object-contain"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Clean Navigation */}
        <div className="flex items-center justify-between px-6 pb-6">
          <CarouselPrevious className="static translate-y-0" />
          <div className="flex gap-2">
            {sliderData.map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-border data-[active]:bg-my-main"
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
}
