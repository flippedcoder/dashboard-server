/*
  Warnings:

  - A unique constraint covering the columns `[stripeInvoiceId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "stripeInvoiceId" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeInvoiceId_key" ON "Order"("stripeInvoiceId");
