"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Slider = () => {
  const { lang } = useParams();
  const ar = lang === "ar";

  // Define slider data with Arabic translations
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
      buttonText1: {
        en: "Buy now",
        ar: "اشتري الآن",
      },
      buttonText2: {
        en: "Find more",
        ar: "اكتشف المزيد",
      },
      imgSrc: "/slider-images/headphone.png",
    },
    {
      id: 2,
      title: {
        en: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
        ar: "تبدأ ألعاب المستوى التالي هنا - اكتشف PlayStation 5 اليوم!",
      },
      offer: {
        en: "Hurry up only few lefts!",
        ar: "أسرع، الكمية محدودة!",
      },
      buttonText1: {
        en: "Shop Now",
        ar: "تسوق الآن",
      },
      buttonText2: {
        en: "Explore Deals",
        ar: "اكتشف العروض",
      },
      imgSrc: "/slider-images/ps.png",
    },
    {
      id: 3,
      title: {
        en: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
        ar: "القوة تلتقي بالأناقة - Apple MacBook Pro هنا من أجلك!",
      },
      offer: {
        en: "Exclusive Deal 40% Off",
        ar: "صفقة حصرية خصم 40%",
      },
      buttonText1: {
        en: "Order Now",
        ar: "اطلب الآن",
      },
      buttonText2: {
        en: "Learn More",
        ar: "تعرف أكثر",
      },
      imgSrc: "/slider-images/3labs.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative  w-full lg:w-[80%] mx-auto rounded-xl">
      <div
        className="flex flex-1 transition-transform duration-700 ease-in-out"
        style={{
          transform: ar
            ? `translateX(${currentSlide * 100}%)`
            : `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-1 flex-col-reverse lg:flex-row items-center justify-between bg-muted py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base bg-gradient-to-r from-green-500 to-blue-700 bg-clip-text text-transparent pb-1">
                {slide.offer[lang as keyof typeof slide.offer]}
              </p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title[lang as keyof typeof slide.title]}
              </h1>
              <div className="flex items-center mt-4 md:mt-6">
                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-gradient-to-r from-green-500 to-blue-700 rounded-full text-white font-medium">
                  {slide.buttonText1[lang as keyof typeof slide.buttonText1]}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                  {slide.buttonText2[lang as keyof typeof slide.buttonText2]}
                  {ar ? <ArrowLeft /> : <ArrowRight />}
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <div className="relative w-72 h-72">
                <Image
                  className="md:w-72 w-48"
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                  fill
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index
                ? "bg-gradient-to-r from-green-500 to-blue-700"
                : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
