/*
  Warnings:

  - You are about to drop the column `owner_id` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `verification_at` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `verified_by` on the `Vendor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_verified_by_fkey";

-- DropIndex
DROP INDEX "Vendor_owner_id_idx";

-- DropIndex
DROP INDEX "Vendor_verified_by_idx";

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "owner_id",
DROP COLUMN "verification_at",
DROP COLUMN "verified_by";

-- CreateTable
CREATE TABLE "VendorUser" (
    "id" SERIAL NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role_in_vendor" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VendorUser_vendor_id_idx" ON "VendorUser"("vendor_id");

-- CreateIndex
CREATE INDEX "VendorUser_user_id_idx" ON "VendorUser"("user_id");

-- CreateIndex
CREATE INDEX "VendorUser_role_in_vendor_idx" ON "VendorUser"("role_in_vendor");

-- CreateIndex
CREATE UNIQUE INDEX "VendorUser_vendor_id_user_id_key" ON "VendorUser"("vendor_id", "user_id");

-- AddForeignKey
ALTER TABLE "VendorUser" ADD CONSTRAINT "VendorUser_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorUser" ADD CONSTRAINT "VendorUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
