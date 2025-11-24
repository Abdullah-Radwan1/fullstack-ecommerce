// lib/data.ts
import { db } from "@/prisma/db";
import { randomUUID } from "crypto";
import { cache } from "react";

// Internal db calls
export const getFirst8Products = cache(async function getFirst8Products() {
  return await db.product.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name_ar: true,
      name_en: true,
      description_ar: true,
      description_en: true,
      basePrice: true,
      image: true,
      categoryId: true,
    },
  });
});
export const first_8_products = getFirst8Products;

export async function relatedProducts(categoryId: number) {
  return await db.product.findMany({
    where: { categoryId },
    take: 4,
    select: {
      id: true,
      name_ar: true,
      name_en: true,
      description_ar: true,
      description_en: true,
      basePrice: true,
      image: true,
      categoryId: true,
    },
  });
}

// Admin functions
export async function getAllUsers() {
  return await db.user.findMany();
}

export async function getAllOrders() {
  return await db.order.findMany({
    include: {
      User: true, // updated to match model casing
      OrderItem: {
        include: {
          Product: true,
        },
      },
    },
  });
}

export async function getMyOrders(userEmail: string) {
  return await db.order.findMany({
    where: {
      User: { email: userEmail },
    },
    include: {
      User: true,
      OrderItem: {
        include: {
          Product: true,
        },
      },
    },
  });
}

// Auth function
export async function getUser(email: string) {
  return await db.user.upsert({
    where: { email },
    create: {
      email,
      updatedAt: new Date(), // required
    },
    update: {},
  });
}

type OrderItemInput = {
  productId: string;
  quantity: number;
};

export const hasMatchingOrder = async (orderItems: OrderItemInput[]) => {
  const orders = await db.order.findMany({
    include: {
      OrderItem: {
        include: {
          Product: true,
        },
      },
    },
  });

  for (const order of orders) {
    if (order.OrderItem.length !== orderItems.length) continue;

    const isMatch = orderItems.every((inputItem) => {
      const orderItem = order.OrderItem.find(
        (item) => item.productId === inputItem.productId
      );
      return orderItem && orderItem.quantity === inputItem.quantity;
    });

    if (isMatch) return true;
  }

  return false;
};
