/*
  Warnings:

  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clerkId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "userId",
ADD COLUMN     "clerkId" TEXT NOT NULL;

-- DropTable
DROP TABLE "VerificationToken";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
