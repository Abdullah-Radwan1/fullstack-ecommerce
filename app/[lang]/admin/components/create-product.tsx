"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { useParams } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import Cloudinary from "@/lib/cloudinary";
import { useImageStore } from "@/zustand/store";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const CreateProduct = () => {
  const { lang } = useParams(); // Get the language from the URL
  const session = useSession();
  const userId = session?.data?.user.id;
  const ar = lang === "ar"; // Check if the language is Arabic

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<number>();
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { imageUrl, setImageUrl } = useImageStore();
  const { setImageName } = useImageStore();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/product-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          basePrice: parseFloat(price),
          categoryId: categoryId,
          image: imageUrl, // Ideally, you should upload the image first and send the URL
          userId, // Add userId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: ar ? "خطأ" : "Error",
          description:
            errorData.error ||
            (ar ? "فشل إنشاء المنتج." : "Failed to create product."),
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: ar ? "نجاح" : "Success",
        description: ar
          ? "تم إنشاء المنتج بنجاح!"
          : "Product created successfully!",
      });

      setName("");
      // setCategoryId(0);
      setPrice("");

      setDescription("");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: ar ? "خطأ" : "Error",
        description: ar
          ? "حدث خطأ أثناء إنشاء المنتج."
          : "An error occurred while creating the product.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setImageUrl("");
      setImageName("");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border-2 shadow-md rounded-md gray-800">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {ar ? "إنشاء منتج جديد" : "Create New Product"}
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            {ar ? "الاسم" : "Name"}
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            minLength={1}
            maxLength={10}
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium mb-1" htmlFor="category">
            {ar ? "الفئة" : "Category"}
          </label>
          <Select
            dir={ar ? "rtl" : "ltr"}
            required
            onValueChange={(value: string) => setCategoryId(parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={ar ? "اختر فئة" : "Select a category"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{ar ? "الفئات" : "Categories"}</SelectLabel>
                <SelectItem value="1">{ar ? "لابات" : "Labs"}</SelectItem>
                <SelectItem value="2">
                  {ar ? "منتجات ثانويه" : "Accessories"}
                </SelectItem>
                <SelectItem value="3">{ar ? "أخرى" : "Other"}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Price Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="price">
            {ar ? "السعر" : "Price"}
          </label>
          <Input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            min={50}
            max={1000}
          />
        </div>

        {/* Image Field */}

        {/* Description Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="description"
          >
            {ar ? "الوصف" : "Description"}
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            minLength={15}
            maxLength={30}
          />
        </div>
        <Cloudinary />
        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:opacity-90 transition text-white py-2 rounded"
        >
          {isLoading
            ? ar
              ? "جاري الإنشاء..."
              : "Creating..."
            : ar
              ? "إنشاء المنتج"
              : "Create Product"}
        </Button>
      </form>
    </div>
  );
};

export default CreateProduct;
