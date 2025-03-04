/*
  Warnings:

  - You are about to drop the column `subTotal` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "subTotal",
ALTER COLUMN "deliveryFee" SET DEFAULT 0;
