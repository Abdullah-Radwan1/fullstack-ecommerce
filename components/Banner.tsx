import React from "react";
import Image from "next/image";
import { Gamepad } from "lucide-react";
import Link from "next/link";

const Banner = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;
  const ar = lang === "ar";

  return (
    <div
      className={`   gap-y-5 flex flex-col md:flex-row items-center justify-between  bg-muted my-16 rounded-xl overflow-hidden `}
      dir="ltr"
    >
      <Image
        className="max-w-56"
        src={"/jbl.png"}
        alt="jbl_soundbox_image"
        loading="lazy"
        width={300}
        height={300}
      />
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
        {ar ? (
          <p className="text-2xl md:text-3xl max-w-[290px]">
            حسن من تجربة{" "}
            <span className=" font-semibold  text-orange-500 ">الألعاب</span>{" "}
            الخاصة بك
          </p>
        ) : (
          <p className="text-2xl md:text-3xl max-w-[290px]">
            Level Up Your{" "}
            <span className=" font-bold  text-orange-500 ">Gaming </span>
            Experience
          </p>
        )}

        {ar ? (
          <p className="max-w-[343px]">
            {"من "}
            <span className="font-bold text-green-500">الصوت</span>
            {" الغامر إلى "}
            <span className="font-bold text-blue-600"> التحكم </span>
            {" الدقيق  — كل ما تحتاجه للفوز "}
          </p>
        ) : (
          <p className="max-w-[343px]">
            {"From immersive "}
            <span className="font-bold text-green-500">sound</span>
            {" to precise "}
            <span className="font-bold text-blue-600">controls</span>
            {" — everything you need to win"}
          </p>
        )}

        <Link
          href={lang === "ar" ? "/ar/products" : "/en/products"}
          className={`group flex items-center justify-center gap-1 px-12 py-2.5 bg-gradient-to-r from-green-500 to-blue-500 rounded text-white ${
            ar ? "flex-row-reverse" : ""
          }`}
        >
          {ar ? "اشتري الآن" : "Buy now"}
          <Gamepad className={ar ? "transform rotate-180" : ""} />{" "}
          {/* Rotate arrow for Arabic */}
        </Link>
      </div>
      <Image
        className="hidden md:block object-contain"
        src={"/banner_c.png"}
        alt="controller_image"
        loading="lazy"
        width={300}
        height={300}
      />
      <Image
        className="md:hidden object-cover"
        src={"/watch.png"}
        alt="watch"
        loading="lazy"
        width={300}
        height={300}
      />
    </div>
  );
};

export default Banner;
