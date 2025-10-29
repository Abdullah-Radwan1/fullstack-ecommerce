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
import React, { useState, useEffect } from "react";
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
  const userId = session?.data?.user.id;
  const ar = lang === "ar";

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<number>();
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const { imageUrl, setImageUrl, setImageName } = useImageStore();

  useEffect(() => {
    const generateDescription = async () => {
      if (name.length > 3) {
        setIsGeneratingDescription(true);
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, lang }),
          });

          if (response.ok) {
            const { description } = await response.json();
            let index = 0;
            const typedText = { current: "" };
            setDescription("");
            const typeWriter = () => {
              if (index < description.length) {
                typedText.current += description.charAt(index);
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
      if (!imageUrl)
        throw new Error(ar ? "الصورة مطلوبة" : "Image is required");

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

      toast.success(
        ar ? "تم إنشاء المنتج بنجاح" : "Product created successfully"
      );

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
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {ar ? "إنشاء منتج جديد" : "Create New Product"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {/* Name */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name">{ar ? "الاسم" : "Name"}</Label>
            <Input
              id="name"
              type="text"
              value={name}
              className="bg-transparent"
              onChange={(e) => setName(e.target.value)}
              required
              minLength={5}
              maxLength={20}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col space-y-2 ">
            <Label htmlFor="category">{ar ? "الفئة" : "Category"}</Label>
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

          {/* Price */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="price">{ar ? "السعر" : "Price"}</Label>
            <Input
              className="bg-transparent"
              id="price"
              type="number"
              value={price}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d{0,2}$/.test(value)) setPrice(value);
              }}
              required
              min="0.01"
              step="0.01"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-2 relative">
            <Label htmlFor="description">
              {ar ? "الوصف" : "Description"}
              {isGeneratingDescription && (
                <h6 className="font-bold bg-gradient-to-r from-my-main to-my-secondary bg-clip-text text-transparent flex items-center gap-1">
                  {ar
                    ? "  يتم الانشاء عبر الذكاء الاصطناعي"
                    : "Generated by Ai"}
                  <Loader2 className="h-4 w-4 animate-spin text-my-main" />
                </h6>
              )}
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              minLength={50}
              maxLength={120}
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              {description.length}/150 {ar ? "حرف" : "chars"}
            </p>
          </div>

          {/* Image Upload */}
          <Cloudinary />

          {/* Submit */}
          <Button
            name="submit"
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
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateProduct;
