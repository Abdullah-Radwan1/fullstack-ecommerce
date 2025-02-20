import FeaturedProduct from "@/components/FeaturedProducts";
import ProductCard from "@/components/productCard";
import Slider from "@/components/ui/slider";
import { db } from "@/lib/db";
import { bestSellers } from "@/lib/Functions";
import Image from "next/image";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const products = await bestSellers();

  return (
    <main className="container m-auto">
      {/* Hero Section */}
      <Slider />
      <div className="relative container flex flex-col items-center justify-center text-center my-6 mx-auto ">
        {/* Optional: Add an image or illustration */}
        <div className="my-2 relative">
          <Image
            src="/png.png" // Replace with your image path
            alt="Padabeedo Store"
            width={100}
            height={100}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Gradient Text */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-500 to-blue-700 bg-clip-text text-transparent">
          {lang === "ar"
            ? "مرحبًا بكم في متجر Padabeedo"
            : "Welcome To Padabeedo Store"}
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
      <FeaturedProduct params={params} />
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
