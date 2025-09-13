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
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Cloudinary from "@/lib/cloudinary";
import { useImageStore } from "@/zustand/store";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const CreateProduct = () => {
  const { lang } = useParams();
  const session = useSession();
  const userId = session?.data?.user.id;
  const ar = lang === "ar";

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<number>();
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const { imageUrl, setImageUrl, setImageName } = useImageStore();

  // Debounced description generation
  useEffect(() => {
    const generateDescription = async () => {
      if (name.length > 3) {
        setIsGeneratingDescription(true);
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name,
              lang: lang,
            }),
          });

          if (response.ok) {
            const { description } = await response.json();

            // Typing animation
            let index = 0;
            const desc = description;
            const typedText = { current: "" };
            setDescription(""); // Clear before typing
            const typeWriter = () => {
              if (index < desc.length) {
                typedText.current += desc.charAt(index);
                setDescription(typedText.current);
                index++;
                setTimeout(typeWriter, 15);
              }
            };

            typeWriter();
          }
        } catch (error) {
          console.error("Description generation failed:", error);
        } finally {
          setIsGeneratingDescription(false);
        }
      }
    };

    const timer = setTimeout(generateDescription, 1000);
    return () => clearTimeout(timer);
  }, [name, lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!imageUrl) {
        throw new Error(ar ? "الصورة مطلوبة" : "Image is required");
      }

      const response = await fetch("/api/product-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          basePrice: parseFloat(price),
          categoryId,
          image: imageUrl,
          userId,
        }),
      });

      if (!response.ok) throw new Error(await response.text());

      toast(ar ? "تم إنشاء المنتج بنجاح" : "Product created successfully");

      // Reset form
      setName("");
      setCategoryId(undefined);
      setPrice("");
      setDescription("");
      setImageUrl("");
      setImageName("");
    } catch (error) {
      toast("error");
    } finally {
      setIsLoading(false);
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
            minLength={5}
            maxLength={20}
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
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d{0,2}$/.test(value)) {
                setPrice(value);
              }
            }}
            className="w-full border rounded px-3 py-2"
            required
            min="0.01"
            step="0.01"
          />
        </div>

        {/* Description Field */}
        <div className="mb-4 relative">
          <label
            className=" text-sm font-medium mb-1 flex gap-2 items-center "
            htmlFor="description"
          >
            {ar ? "الوصف" : "Description"}
            {isGeneratingDescription && (
              <span className="text-xs text-muted-foreground ml-2 flex gap-2 ">
                <h6 className="text-sm font-bold bg-gradient-to-r from-green-500 to-blue-700  bg-clip-text text-transparent">
                  {ar
                    ? "  يتم الانشاء عبر الذكاء الاصطناعي"
                    : "Generated by Ai"}
                </h6>
                <Loader2 className="h-4 w-4 animate-spin  text-green-500" />
              </span>
            )}
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 min-h-[100px] bg-muted"
            required
            minLength={50}
            maxLength={120}
          />

          <p className="text-xs text-muted-foreground mt-1">
            {description.length}/150 {ar ? "حرف" : "chars"}
          </p>
        </div>

        {/* Image Upload */}
        <Cloudinary />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:opacity-90 transition text-white py-2 rounded flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
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
