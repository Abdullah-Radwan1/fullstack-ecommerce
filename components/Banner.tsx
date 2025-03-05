import React from "react";
import Image from "next/image";
import { ArrowBigLeft } from "lucide-react";
import Link from "./Link";

const Banner = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;
  const isArabic = lang === "ar";

  // Text content based on language
  const content = {
    title: isArabic
      ? "حسن من تجربة الألعاب الخاصة بك"
      : "Level Up Your Gaming Experience",
    description: isArabic
      ? "من الصوت الغامر إلى التحكم الدقيق—كل ما تحتاجه للفوز"
      : "From immersive sound to precise controls—everything you need to win",
    buttonText: isArabic ? "اشتري الآن" : "Buy now",
  };

  return (
    <div
      className={` w-[80%] md:w-full lg:w-[80%] mx-auto gap-y-5 flex flex-col md:flex-row items-center justify-between  bg-muted my-16 rounded-xl overflow-hidden 
      }`}
      dir="ltr"
    >
      <Image
        className="max-w-56"
        src={"/pcParts/jbl.png"}
        alt="jbl_soundbox_image"
        width={200}
        height={200}
      />
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px]">
          {content.title}
        </h2>
        <p className="max-w-[343px] font-medium ">{content.description}</p>
        <Link
          href={lang === "ar" ? "/ar/products" : "/en/products"}
          className={`group flex items-center justify-center gap-1 px-12 py-2.5 bg-gradient-to-r from-green-500 to-blue-500 rounded text-white ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          {content.buttonText}
          <ArrowBigLeft
            className={isArabic ? "transform rotate-180" : ""}
          />{" "}
          {/* Rotate arrow for Arabic */}
        </Link>
      </div>
      <Image
        className="hidden md:block object-contain"
        src={"/pcParts/md_controller_image.png"}
        alt="md_controller_image"
        width={300}
        height={300}
      />
      <Image
        className="md:hidden object-cover"
        src={"/pcParts/watch.png"}
        alt="sm_controller_image"
        width={300}
        height={300}
      />
    </div>
  );
};

export default Banner;
