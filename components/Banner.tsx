import React from "react";
import Image from "next/image";
import { Gamepad } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Banner = () => {
  const t = useTranslations("Banner");

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between gap-y-5 my-16 rounded-2xl overflow-hidden shadow-lg border"
      style={{
        background: "var(--color-card)",
        borderColor: "var(--my-main)",
      }}
    >
      {/* Left Image */}
      <Image
        className="object-center"
        src="https://res.cloudinary.com/dpyo7pbmo/image/upload/v1774266922/jbl_cyoe83.png"
        alt="jbl_soundbox_image"
        loading="lazy"
        width={250}
        height={250}
      />

      {/* Text Section */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 px-6 py-6">
        <h2
          className="text-3xl font-semibold max-w-[340px] leading-snug"
          style={{ color: "var(--my-main)" }}
        >
          {t.rich("title", {
            highlight: (chunks) => (
              <span
                style={{
                  color: "var(--my-secondary)",
                  textShadow: "0 0 6px var(--my-secondary)",
                }}
              >
                {chunks}
              </span>
            ),
          })}
        </h2>

        <p
          className="text-sm md:text-base max-w-[380px] leading-relaxed"
          style={{ color: "var(--foreground)" }}
        >
          {t.rich("description", {
            bold: (chunks) => (
              <span className="font-bold" style={{ color: "var(--my-main)" }}>
                {chunks}
              </span>
            ),
          })}
        </p>

        <Link
          aria-label="products"
          href="/shop"
          className="group flex items-center justify-center gap-2 mt-3 px-10 py-2.5 font-semibold rounded-full shadow-md transition duration-300"
          style={{
            backgroundColor: "var(--my-main)",
            color: "black",
          }}
        >
          {t("button")}
          <Gamepad className="transition-transform duration-300 group-hover:rotate-12 rtl:rotate-180" />
        </Link>
      </div>

      {/* Right Images */}
      <div className="relative flex items-center justify-center">
        <Image
          className="hidden md:block object-contain brightness-90"
          src="https://res.cloudinary.com/dpyo7pbmo/image/upload/v1774266919/banner_c_owaqhq.png"
          alt="controller_image"
          width={300}
          height={300}
        />
        <Image
          className="md:hidden object-cover brightness-90"
          src="https://res.cloudinary.com/dpyo7pbmo/image/upload/v1774266922/watch_x7fkwm.png"
          alt="watch"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default Banner;
