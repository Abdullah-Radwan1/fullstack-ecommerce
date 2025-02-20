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

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const product = await db.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main className="container mx-auto p-4">
      <Card className="mx-auto">
        <CardContent className="p-0">
          <div className="flex justify-between gap-6 flex-col sm:flex-row">
            {/* Left column - Product Image */}
            <div className="relative  flex-1">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="object-fill w-full h-full "
              />
            </div>

            {/* Right column - Product Details and Actions */}
            <div className="p-6 space-y-8 flex-1">
              <div className="space-y-4">
                <h1 className="scroll-m-20 text-4xl font-bold ">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold">
                  ${Number(product.basePrice).toFixed(2)}
                </p>
                <p className="leading-7">{product.description}</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Size</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity</label>
                  <Input type="number" min="1" defaultValue="1" />
                </div>

                <Button className="w-full" size="lg">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;
