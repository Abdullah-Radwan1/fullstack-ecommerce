-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_clerkId_fkey";

-- CreateIndex
CREATE INDEX "Order_clerkId_idx" ON "Order"("clerkId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
