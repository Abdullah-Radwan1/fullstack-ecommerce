import { db } from "@/lib/db";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "@/components/Link";

const Page = async ({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) => {
  const { id, lang } = await params;
  const ar = lang === "ar";
  const product = await db.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) {
    return <div>المنتج غير موجود</div>; // Arabic: "Product not found"
  }

  return (
    <main className="container mx-auto p-4" dir={ar ? "rtl" : "ltr"}>
      <Card className="mx-auto">
        <CardContent className="p-0">
          <div className="flex justify-between gap-6 flex-col sm:flex-row">
            {/* Left column - Product Image */}
            <div className="relative flex-1">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="object-fill w-full h-full"
              />
            </div>

            {/* Right column - Product Details and Actions */}
            <div className="p-6 space-y-8 flex-1">
              <div className="space-y-4">
                <h1 className="scroll-m-20 text-4xl font-bold">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold">
                  ${Number(product.basePrice).toFixed(2)}
                </p>
                <p className="leading-7">{product.description}</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">الحجم</label> {/* Arabic: "Size" */}
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحجم" /> {/* Arabic: "Select size" */}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">صغير</SelectItem> {/* Arabic: "Small" */}
                      <SelectItem value="medium">متوسط</SelectItem> {/* Arabic: "Medium" */}
                      <SelectItem value="large">كبير</SelectItem> {/* Arabic: "Large" */}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">الكمية</label> {/* Arabic: "Quantity" */}
                  <Input type="number" min="1" defaultValue="1" />
                </div>

                <Button className="w-full" size="lg">
                  أضف إلى السلة {/* Arabic: "Add to Cart" */}
                </Button>
                <Link
                  className="w-full bg-muted m-auto mt-8"
                  href={ar ? "/ar/checkout" : "/en/checkout"}
                >
                  <Button className="w-full mt-3" size="lg">
                    الدفع {/* Arabic: "Checkout" */}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;