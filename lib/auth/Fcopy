// Cached functions return plain JSON-serializable objects, solving the Prisma Decimal issue.//but i have removed decimal from

import { cache } from "./cache";
import { db } from "./db";
export const first_10_products = cache(
  async () => {
    return await db.product.findMany({ take: 10 });
  },
  ["first_10_products"],
  { revalidate: 5 }
);

//

export const relatedProducts = cache(
  async (categoryId: number) => {
    return await db.product.findMany({
      where: { categoryId },
      take: 4,
    });
  },
  ["relatedProducts"],
  { revalidate: 10 }
);

export const allUsers = cache(
  async () => {
    return await db.user.findMany();
  },
  ["allUsers"],
  { revalidate: 10 }
);
export const allOrders = cache(
  async () => {
    return await db.order.findMany({
      include: {
        user: true,
        orderItems: {
          include: {
            product: true, // Include the Product relation
          },
        },
      },
    });
  },
  ["allOrders"],
  { revalidate: 10 }
);
export const myOrders = cache(
  async (userEmail: string) => {
    return await db.order.findMany({
      where: {
        user: {
          email: userEmail, // Filter orders by the logged-in user's email
        },
      },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true, // Include the Product relation
          },
        },
      },
    });
  },
  ["myOrders"], // Cache key
  { revalidate: 10 } // Revalidate every 10 seconds
);

type OrderItemInput = {
  productId: string;
  quantity: number;
};

export const hasMatchingOrder = async (orderItems: OrderItemInput[]) => {
  // Fetch all orders with their orderItems
  const orders = await db.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  // Check each order for a match
  for (const order of orders) {
    // Compare the number of order items
    if (order.orderItems.length !== orderItems.length) {
      continue; // Skip if the number of items doesn't match
    }

    // Check if all order items match
    const isMatch = orderItems.every((inputItem) => {
      const orderItem = order.orderItems.find(
        (item) => item.productId === inputItem.productId
      );
      return orderItem && orderItem.quantity === inputItem.quantity;
    });

    // If a match is found, return true
    if (isMatch) {
      return true;
    }
  }

  // No matching order found
  return false;
};
// export async function createproduct({
//   userId,
//   name,
//   description,
//   image,
//   basePrice,
//   categoryId,
// }: Product & { userId: string }) {
//   // Step 1: Check if the user already has 2 or more products
//   const productCount = await db.product.count({
//     where: { userId },
//   });

//   if (productCount >= 2) {
//     throw new Error("You can only create 2 products");
//   }

//   // Step 2: Create the product and associate it with the user
//   const product = await db.product.create({
//     data: {
//       name,
//       description,
//       image,
//       basePrice,
//       categoryId,
//       userId, // Ensure the userId is assigned to the product
//     },
//   });

//   return product;
// }
// export const bestSellers = cache(
//   async () => {
//     return await db.product.findMany({
//       take: 4,
//       where: { orderItems: { some: {} } },
//       orderBy: { orderItems: { _count: "desc" } },
//       include: { orderItems: true },
//     });
//   },
//   ["bestSellers"],
//   { revalidate: 10 }
// );
