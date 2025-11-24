// prisma/seed.ts
import { db } from "./db";

async function main() {
  // Seed categories
  const categories = [
    { id: 1, name: "Laptops" },
    { id: 2, name: "Accessories" },
    { id: 3, name: "Electronics" },
  ];

  for (const category of categories) {
    await db.category.upsert({
      where: { id: category.id },
      update: {},

      create: category,
    });
  }

  console.log("Categories seeded.");

  // Seed products
  const products = [
    {
      id: "cm84m00pp0066vg2kq8y2x3il",
      name_ar: "ماك بوك برو 2023",
      name_en: "MacBook Pro 2023",
      description_ar:
        "تجربة أداء لا مثيل لها مع أحدث MacBook Pro. مثالي للمحترفين والمبدعين.",
      description_en:
        "Experience unparalleled performance with the latest MacBook Pro. Perfect for professionals and creatives.",
      image: "/products/mac2.png",
      basePrice: 289,
      categoryId: 1,
      updatedAt: new Date(),
    },
    {
      id: "cm84m00pp006avg2k9ty963ji",
      name_ar: "سماعة بلوتوث JBL",
      name_en: "JBL Bluetooth Speaker",
      description_ar:
        "تمتع بصوت واضح مع سماعة JBL المحمولة. مثالية للحفلات والرحلات.",
      description_en:
        "Enjoy crystal-clear sound with this portable JBL Bluetooth speaker. Perfect for parties and outdoor adventures.",
      image: "/products/jbl.png",
      basePrice: 1209,
      categoryId: 3,
      updatedAt: new Date(),
    },
    {
      id: "cm84m00pp006bvg2knn74n1fc",
      name_ar: "كاميرا DSLR احترافية",
      name_en: "Professional DSLR Camera",
      description_ar: "التقط صور وفيديوهات مذهلة مع هذه الكاميرا عالية الجودة.",
      description_en:
        "Capture stunning photos and videos with this high-quality DSLR camera. A must-have for photographers.",
      image: "/products/camera.png",
      basePrice: 419,
      categoryId: 3,
      updatedAt: new Date(),
    },
    {
      id: "cm84m00pp006evg2kptvgf0f1",
      name_ar: "آيربودز برو",
      name_en: "AirPods Pro",
      description_ar:
        "تمتع بصوت عالي الجودة مع خاصية إلغاء الضوضاء لهذه السماعات الأنيقة.",
      description_en:
        "Experience premium sound quality and noise cancellation with these sleek AirPods Pro.",
      image: "/products/airpods.png",
      basePrice: 679,
      categoryId: 3,
      updatedAt: new Date(),
    },
    {
      id: "cm84m00pp0068vg2k61d0q6zf",
      name_ar: "حاسوب محمول Strix X للألعاب",
      name_en: "Strix X Gaming Laptop",
      description_ar: "نحيف وخفيف الوزن وقوي. مثالي للإنتاجية أثناء التنقل.",
      description_en:
        "Slim, lightweight, and powerful. The Strix X laptop is perfect for productivity on the go.",
      image: "/products/asus.png",
      basePrice: 469,
      categoryId: 1,
      updatedAt: new Date(),
    },
    {
      id: "cm84m00pp0067vg2kqszuwqgm",
      name_ar: "حاسوب محمول ASUS للألعاب",
      name_en: "ASUS Gaming Laptop",
      description_ar:
        "تسيطر على عالم الألعاب مع هذا الحاسوب المحمول ASUS عالي الأداء.",
      description_en:
        "Dominate the gaming world with this high-performance ASUS laptop. Built for speed and power.",
      image: "/products/asuslab.png",
      basePrice: 239,
      categoryId: 1,
      updatedAt: new Date(),
    },
    {
      id: "cm84m00pp006dvg2kbctgsr62",
      name_ar: "ميكروفون احترافي",
      name_en: "Professional Microphone",
      description_ar: "مصمم للاعبين، يوفر دقة وجودة وأزرار قابلة للتخصيص.",
      description_en:
        "Designed for gamers, this Microphone offers precision, quality, and customizable buttons.",
      image: "/products/mice.png",
      basePrice: 889,
      categoryId: 2,
      updatedAt: new Date(),
    },
    {
      id: "cm84m00pp006cvg2kq7wak4qq",
      name_ar: "ماوس لاسلكي مريح",
      name_en: "Ergonomic Wireless Mouse",
      description_ar:
        "حسّن إنتاجيتك مع هذا الماوس اللاسلكي المريح والسريع الاستجابة.",
      description_en:
        "Enhance your productivity with this comfortable and responsive wireless mouse.",
      image: "/products/hand.png",
      basePrice: 979,
      categoryId: 2,
      updatedAt: new Date(),
    },
    {
      id: "cm84m00pp0069vg2kxiaxj5hx",
      name_ar: "حاسوب مختبري عالي الأداء",
      name_en: "High-Performance Lab PC",
      description_ar:
        "مثالي للمختبرات والأبحاث، يقدم أداءً موثوقًا وعالي الجودة.",
      description_en:
        "Ideal for labs and research, this PC offers top-tier performance and reliability.",
      image: "/products/lab2.png",
      basePrice: 559,
      categoryId: 1,
      updatedAt: new Date(),
    },
    {
      id: "cm84m00pp0065vg2ko3uj5xiq",
      name_ar: "ساعة ذكية كلاسيكية",
      name_en: "Classic Smart Watch",
      description_ar:
        "ابق متصلاً مع هذه الساعة الذكية الأنيقة. تتبع اللياقة والإشعارات والمزيد.",
      description_en:
        "Stay connected with this sleek and stylish smartwatch. Track your fitness, receive notifications, and more.",
      image: "/products/watch.png",
      basePrice: 199,
      categoryId: 3,
      updatedAt: new Date(),
    },
    {
      id: "cm84m00pp006fvg2kbosehphone",
      name_ar: "سماعات BOSE QuietComfort Ultra",
      name_en: "BOSE QuietComfort Ultra Headphones",
      description_ar:
        "استمتع بصوت نقي مع سماعات BOSE QuietComfort Ultra. جودة صوت ممتازة وراحة مثالية.",
      description_en:
        "Experience Pure Sound with the BOSE QuietComfort Ultra Headphones. Immerse yourself in crystal-clear audio with industry-leading noise cancellation technology. Perfect for music lovers, travelers, and professionals seeking unparalleled sound quality and comfort.",
      image: "/products/bose.png",
      basePrice: 429,
      categoryId: 3,
      updatedAt: new Date(),
    },
  ];

  for (const product of products) {
    await db.product.upsert({
      where: { id: product.id },
      update: {
        ...product,
        userId: "cmidkixnl00008ktbd9fajesp", // make sure userId is updated too
      },
      create: {
        ...product,
        userId: "cmidkixnl00008ktbd9fajesp", // ✅ required for create
      },
    });
  }

  console.log("Products seeded successfully. 🤍");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
