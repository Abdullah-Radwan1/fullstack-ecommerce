import { db } from "../lib/db";

async function main() {
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

  const products = [
    {
      id: "cm84wonwp0001vgn4cmw7e1yy",
      name: "asus prime",
      description: "a description for testing",
      image:
        "https://res.cloudinary.com/dpyo7pbmo/image/upload/v1741722644/xuzv4vt5mmyv8jnbqgkj.png",
      basePrice: 232,
      categoryId: 1,
    },
    {
      id: "cm84m00pp0066vg2kq8y2x3il",
      name: "MacBook Pro 2023",
      description:
        "Experience unparalleled performance with the latest MacBook Pro. Perfect for professionals and creatives.",
      image: "/products/mac2.png",
      basePrice: 29,
      categoryId: 1,
    },
    {
      id: "cm84m00pp006avg2k9ty963ji",
      name: "JBL Bluetooth Speaker",
      description:
        "Enjoy crystal-clear sound with this portable JBL Bluetooth speaker. Perfect for parties and outdoor adventures.",
      image: "/products/jbl.png",
      basePrice: 69,
      categoryId: 3,
    },
    {
      id: "cm84m00pp006bvg2knn74n1fc",
      name: "Professional DSLR Camera",
      description:
        "Capture stunning photos and videos with this high-quality DSLR camera. A must-have for photographers.",
      image: "/products/camera.png",
      basePrice: 69,
      categoryId: 3,
    },
    {
      id: "cm84m00pp006evg2kptvgf0f1",
      name: "AirPods Pro",
      description:
        "Experience premium sound quality and noise cancellation with these sleek AirPods Pro.",
      image: "/products/airpods.png",
      basePrice: 69,
      categoryId: 3,
    },
    {
      id: "cm84m00pp0068vg2k61d0q6zf",
      name: "ASUS ZenBook",
      description:
        "Slim, lightweight, and powerful. The ASUS ZenBook is perfect for productivity on the go.",
      image: "/products/asus.png",
      basePrice: 49,
      categoryId: 1,
    },
    {
      id: "cm84m00pp0067vg2kqszuwqgm",
      name: "ASUS Gaming Laptop",
      description:
        "Dominate the gaming world with this high-performance ASUS laptop. Built for speed and power.",
      image: "/products/asuslab.png",
      basePrice: 39,
      categoryId: 1,
    },
    {
      id: "cm84m00pp006dvg2kbctgsr62",
      name: "Gaming Mouse",
      description:
        "Designed for gamers, this mouse offers precision, speed, and customizable buttons.",
      image: "/products/mice.png",
      basePrice: 69,
      categoryId: 2,
    },
    {
      id: "cm84m00pp006cvg2kq7wak4qq",
      name: "Ergonomic Wireless Mouse",
      description:
        "Enhance your productivity with this comfortable and responsive wireless mouse.",
      image: "/products/hand.png",
      basePrice: 69,
      categoryId: 2,
    },
    {
      id: "cm84m00pp0069vg2kxiaxj5hx",
      name: "High-Performance Lab PC",
      description:
        "Ideal for labs and research, this PC offers top-tier performance and reliability.",
      image: "/products/lab2.png",
      basePrice: 59,
      categoryId: 1,
    },
    {
      id: "cm84m00pp0065vg2ko3uj5xiq",
      name: "Classic Smart Watch",
      description:
        "Stay connected with this sleek and stylish smartwatch. Track your fitness, receive notifications, and more.",
      image: "/products/watch.png",
      basePrice: 19,
      categoryId: 3,
    },
  ];

  for (const product of products) {
    await db.product.upsert({
      where: { id: product.id },
      update: {},
      create: product,
    });
  }

  console.log("Products seeded.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
