import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://fullstack-ecommerce-flax.vercel.app",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://fullstack-ecommerce-flax.vercel.app",
          ar: "https://fullstack-ecommerce-flax.vercel.app/ar",
        },
      },
    },
    {
      url: "https://fullstack-ecommerce-flax.vercel.app/shop",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://fullstack-ecommerce-flax.vercel.app/shop",
          ar: "https://fullstack-ecommerce-flax.vercel.app/ar/shop",
        },
      },
    },
  ];
}
