/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "customerId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_customerId_key" ON "Subscription"("customerId");
