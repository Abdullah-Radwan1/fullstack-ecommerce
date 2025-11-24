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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Cloudinary from "@/lib/cloudinary";
import { useImageStore } from "@/zustand/store";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CreateProduct = () => {
  const { lang } = useParams();
  const session = useSession();
  const ar = lang === "ar";

  const [name_ar, setNameAr] = useState("");
  const [name_en, setNameEn] = useState("");
  const [description_ar, setDescriptionAr] = useState("");
  const [description_en, setDescriptionEn] = useState("");
  const [categoryId, setCategoryId] = useState<number>();
  const [basePrice, setBasePrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { imageUrl, setImageUrl, setImageName } = useImageStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session.data?.user?.id) {
      toast.error(ar ? "يجب تسجيل الدخول" : "You must be logged in");
      return;
    }

    setIsLoading(true);
    try {
      if (!imageUrl)
        throw new Error(ar ? "الصورة مطلوبة" : "Image is required");
      if (!categoryId)
        throw new Error(ar ? "الفئة مطلوبة" : "Category is required");

      const response = await fetch("/api/product-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name_ar,
          name_en,
          description_ar,
          description_en,
          basePrice: parseFloat(basePrice),
          categoryId,
          image: imageUrl,
          userId: session.data.user.id,
        }),
      });

      if (!response.ok) throw new Error(await response.text());

      toast.success(
        ar ? "تم إنشاء المنتج بنجاح" : "Product created successfully"
      );

      // Reset form
      setNameAr("");
      setNameEn("");
      setDescriptionAr("");
      setDescriptionEn("");
      setCategoryId(undefined);
      setBasePrice("");
      setImageUrl("");
      setImageName("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-xl border-0 mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {ar ? "إنشاء منتج جديد" : "Create New Product"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name Arabic */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name_ar">
              {ar ? "الاسم بالعربية" : "Name (Arabic)"}
            </Label>
            <Input
              id="name_ar"
              type="text"
              value={name_ar}
              onChange={(e) => setNameAr(e.target.value)}
              required
              minLength={2}
              maxLength={50}
              className="bg-card"
            />
          </div>

          {/* Name English */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name_en">
              {ar ? "الاسم بالإنجليزية" : "Name (English)"}
            </Label>
            <Input
              id="name_en"
              type="text"
              value={name_en}
              onChange={(e) => setNameEn(e.target.value)}
              required
              minLength={2}
              maxLength={50}
              className="bg-card"
            />
          </div>

          {/* Description Arabic */}
          <div className="flex flex-col space-y-2 md:col-span-2">
            <Label htmlFor="description_ar">
              {ar ? "الوصف بالعربية" : "Description (Arabic)"}
            </Label>
            <Textarea
              id="description_ar"
              value={description_ar}
              onChange={(e) => setDescriptionAr(e.target.value)}
              required
              minLength={20}
              maxLength={250}
              className="min-h-[80px]"
            />
          </div>

          {/* Description English */}
          <div className="flex flex-col space-y-2 md:col-span-2">
            <Label htmlFor="description_en">
              {ar ? "الوصف بالإنجليزية" : "Description (English)"}
            </Label>
            <Textarea
              id="description_en"
              value={description_en}
              onChange={(e) => setDescriptionEn(e.target.value)}
              required
              minLength={20}
              maxLength={250}
              className="min-h-[80px] bg-none"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="category">{ar ? "الفئة" : "Category"}</Label>
            <Select
              required
              onValueChange={(value: string) => setCategoryId(parseInt(value))}
              dir={ar ? "rtl" : "ltr"}
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

          {/* Price */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="price">{ar ? "السعر" : "Price"}</Label>
            <Input
              id="price"
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              min="0.1"
              maxLength={3}
              step="0.01"
              required
              className="bg-card"
            />
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <Cloudinary />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 w-full"
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
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateProduct;
