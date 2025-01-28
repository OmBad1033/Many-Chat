/*
  Warnings:

  - You are about to drop the column `customerId` on the `Subscription` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Subscription_customerId_key";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "customerId";
