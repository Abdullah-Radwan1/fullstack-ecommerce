import ProductCard from "@/components/productCard";
import { db } from "@/lib/db";
import Image from "next/image";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  // First create the products without sizes
  // const products = await db.product.createMany({
  //   data: [
  //     {
  //       name: "Product 1",
  //       description: "Description for Product 1",
  //       image: "/products/red.png",
  //       order: 1,
  //       basePrice: 100,
  //       categoryId: "category1",
  
  //     },
  //     {
  //       name: "Product ",
  //       description: "Description for Product 2",
  //       image: "/products/blue.png",
  //       order: 2,
  //       basePrice: 100,
  //       categoryId: "category2",
  //     },
  //     {
  //       name: "Product 3",
  //       description: "Description for Product 3",
  //       image: "/products/green.png",
  //       order: 3,
  //       basePrice: 100,
  //       categoryId: "category3",
  //     },
  //   ],
  // });

  // // Get the created products to get their IDs
  // const createdProducts = await db.product.findMany({
  //   where: {
  //     OR: [
  //       { name: "Product 1" },
  //       { name: "Product 2" },
  //       { name: "Product 3" }
  //     ]
  //   }
  // });

  // Create sizes for each product
  // for (const product of createdProducts) {
  //   await db.size.createMany({
  //     data: [
  //       {
  //         name: "SMALL",
  //         price: product.basePrice ,
  //         productId: product.id
  //       },
  //       {
  //         name: "MEDIUM",
  //         price: product.basePrice,
  //         productId: product.id
  //       },
  //       {
  //         name: "LARGE",
  //         price: product.basePrice ,
  //         productId: product.id
  //       }
  //     ]
  //   });
  // }
const products  = await db.product.findMany()
  return (
    <main >
      {/* Hero Section */}
      <div className="relative w-[20rem] flex flex-col items-center justify-center text-center mx-auto ">
        {/* Optional: Add an image or illustration */}
        <div className="my-2">
          <Image
            src="/png.png" // Replace with your image path
            alt="Padabeedo Store"
            width={200}
            height={200}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Gradient Text */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-500 to-blue-700 bg-clip-text text-transparent">
          {lang === "ar" ? "مرحبًا بكم في متجر Padabeedo" : "Welcome To Padabeedo Store"}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          {lang === "ar"
            ? "متجركم الشامل لكل ما هو رائع!"
            : "Your one-stop shop for all things amazing!"}
        </p>

        {/* Call-to-Action Button */}
        <button className="mt-8 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-700 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-800 transition-all duration-300">
          {lang === "ar" ? "تسوق الآن" : "Shop Now"}
        </button>
      </div>
      {/* Product Grid */}
      <div className=" mx-auto p-6">
        <h2 className="text-4xl font-semibold text-center  mb-6">
          {lang === "ar" ? "المنتجات" : "Products"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}