/*
  Warnings:

  - You are about to drop the column `city` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryFee` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "city",
DROP COLUMN "deliveryFee";
