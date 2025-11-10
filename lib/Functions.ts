// lib/data.ts (for example)

import { db } from "@/prisma/db";
import { cache } from "react";

// Internal db calls
export const getFirst8Products = cache(async function getFirst8Products() {
  return await db.product.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      basePrice: true,
      image: true,
      categoryId: true,
    },
  });
});
export const first_8_products = getFirst8Products;

async function getRelatedProducts(categoryId: number) {
  return await db.product.findMany({
    where: { categoryId },
    take: 4,
  });
}
export const relatedProducts = getRelatedProducts;
// admin function
async function getAllUsers() {
  return await db.user.findMany();
}
export const allUsers = getAllUsers;

async function getAllOrders() {
  return await db.order.findMany({
    include: {
      user: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
}
export const allOrders = getAllOrders;

async function getMyOrders(userEmail: string) {
  return await db.order.findMany({
    where: {
      user: {
        email: userEmail,
      },
    },
    include: {
      user: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
}
export const myOrders = getMyOrders;
// auth function
async function getUserFunc(email: string) {
  return await db.user.upsert({
    where: { email },
    create: { email },
    update: {},
  });
}
export const getUser = getUserFunc;
type OrderItemInput = {
  productId: string;
  quantity: number;
};

export const hasMatchingOrder = async (orderItems: OrderItemInput[]) => {
  const orders = await db.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  for (const order of orders) {
    if (order.orderItems.length !== orderItems.length) continue;

    const isMatch = orderItems.every((inputItem) => {
      const orderItem = order.orderItems.find(
        (item) => item.productId === inputItem.productId
      );
      return orderItem && orderItem.quantity === inputItem.quantity;
    });

    if (isMatch) return true;
  }

  return false;
};
