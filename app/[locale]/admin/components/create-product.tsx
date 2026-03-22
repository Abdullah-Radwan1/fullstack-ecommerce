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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Cloudinary from "@/lib/cloudinary";
import { useImageStore } from "@/zustand/store";

const CreateProduct = () => {
  const locale = useLocale();
  const t = useTranslations("CreateProductPage");

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
    setIsLoading(true);
    try {
      if (!imageUrl) throw new Error(t("imageRequired"));
      if (!categoryId) throw new Error(t("categoryRequired"));

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
        }),
      });

      if (!response.ok) throw new Error(await response.text());

      toast.success(t("productCreated"));

      setNameAr("");
      setNameEn("");
      setDescriptionAr("");
      setDescriptionEn("");
      setCategoryId(undefined);
      setBasePrice("");
      setImageUrl("");
      setImageName("");
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto mt-12 border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-lg shadow-lg">
      <CardHeader className="pb-0">
        <CardTitle className="text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-my-main to-my-secondary">
          {t("createNewProduct")}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name Fields */}
          {[
            {
              value: name_ar,
              setter: setNameAr,
              label: t("nameArabic"),
            },
            {
              value: name_en,
              setter: setNameEn,
              label: t("nameEnglish"),
            },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col space-y-2">
              <Label>{field.label}</Label>
              <Input
                type="text"
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                required
                minLength={2}
                maxLength={50}
                className="bg-card/70 backdrop-blur-sm hover:border-my-main focus:border-my-secondary transition-all"
              />
            </div>
          ))}

          {/* Description Fields */}
          {[
            {
              value: description_ar,
              setter: setDescriptionAr,
              label: t("descriptionArabic"),
            },
            {
              value: description_en,
              setter: setDescriptionEn,
              label: t("descriptionEnglish"),
            },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col space-y-2 md:col-span-2">
              <Label>{field.label}</Label>
              <Textarea
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                required
                minLength={20}
                maxLength={250}
                className="min-h-[100px] bg-card/50 backdrop-blur-sm hover:border-my-main focus:border-my-secondary transition-all resize-none"
              />
            </div>
          ))}

          {/* Category */}
          <div className="flex flex-col space-y-2">
            <Label>{t("category")}</Label>
            <Select
              required
              onValueChange={(value: string) => setCategoryId(parseInt(value))}
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <SelectTrigger className="w-full bg-card/70 backdrop-blur-sm hover:border-my-main focus:border-my-secondary transition-all">
                <SelectValue placeholder={t("selectCategory")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("categories")}</SelectLabel>
                  <SelectItem value="1">{t("labs")}</SelectItem>
                  <SelectItem value="2">{t("accessories")}</SelectItem>
                  <SelectItem value="3">{t("other")}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="flex flex-col space-y-2">
            <Label>{t("price")}</Label>
            <Input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              min="0.1"
              step="0.01"
              required
              className="bg-card/70 backdrop-blur-sm hover:border-my-main focus:border-my-secondary transition-all"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <Cloudinary />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 flex items-center justify-center gap-3 text-lg bg-gradient-to-r from-my-main to-my-secondary hover:scale-105 hover:shadow-lg transition-all font-semibold"
            >
              {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
              {isLoading ? t("creating") : t("createProduct")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateProduct;
