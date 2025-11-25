import React from "react";
import Image from "next/image";
import { Gamepad } from "lucide-react";
import Link from "next/link";

const Banner = async ({ lang }: { lang: string }) => {
  const ar = lang === "ar";

  return (
    <div
      className={` flex flex-col md:flex-row items-center justify-between gap-y-5 my-16 rounded-2xl overflow-hidden 
      shadow-lg border`}
      style={{
        background: "var(--color-card)",
        borderColor: "var(--my-main)",
      }}
      dir="ltr"
    >
      {/* Left Image */}
      <Image
        className=" object-center"
        src={"/products/jbl.png"}
        alt="jbl_soundbox_image"
        loading="lazy"
        width={250}
        height={250}
      />

      {/* Text Section */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 px-6 py-6">
        <p
          className="text-3xl font-semibold max-w-[340px] leading-snug"
          style={{ color: "var(--my-main)" }}
        >
          {ar ? (
            <>
              حسن من تجربة{" "}
              <span
                style={{
                  color: "var(--my-secondary)",
                  textShadow: "0 0 6px var(--my-secondary)",
                }}
              >
                الألعاب
              </span>{" "}
              الخاصة بك
            </>
          ) : (
            <>
              Level Up Your{" "}
              <span
                style={{
                  color: "var(--my-secondary)",
                  textShadow: "0 0 6px var(--my-secondary)",
                }}
              >
                Gaming
              </span>{" "}
              Experience
            </>
          )}
        </p>

        <p
          className="text-sm md:text-base max-w-[380px] leading-relaxed"
          style={{ color: "var(--foreground)" }}
        >
          {ar ? (
            <>
              من{" "}
              <span className="font-bold" style={{ color: "var(--my-main)" }}>
                الصوت الغامر
              </span>{" "}
              إلى{" "}
              <span className="font-bold" style={{ color: "var(--my-main)" }}>
                التحكم الدقيق
              </span>{" "}
              — كل ما تحتاجه للفوز
            </>
          ) : (
            <>
              From immersive{" "}
              <span className="font-bold" style={{ color: "var(--my-main)" }}>
                sound
              </span>{" "}
              to precise{" "}
              <span className="font-bold" style={{ color: "var(--my-main)" }}>
                controls
              </span>{" "}
              — everything you need to win
            </>
          )}
        </p>

        <Link
          aria-label="products"
          href={lang === "ar" ? "/ar/products" : "/en/products"}
          className={`group flex items-center justify-center gap-2 mt-3 px-10 py-2.5 font-semibold rounded-full shadow-md transition duration-300
            ${ar ? "flex-row-reverse" : ""}`}
          style={{
            backgroundColor: "var(--my-main)",
            color: "black",
          }}
        >
          {ar ? "هل أنت جاهز !" : "Are You Ready !"}
          <Gamepad
            className={`transition-transform duration-300 group-hover:rotate-12 ${
              ar ? "transform rotate-180" : ""
            }`}
          />
        </Link>
      </div>

      {/* Right Images */}
      <div className="relative flex items-center justify-center">
        <Image
          className="hidden md:block object-contain brightness-90 "
          src={"/products/banner_c.png"}
          alt="controller_image"
          loading="lazy"
          width={300}
          height={300}
        />
        <Image
          className="md:hidden object-cover brightness-90"
          src={"/products/watch.png"}
          alt="watch"
          loading="lazy"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default Banner;
