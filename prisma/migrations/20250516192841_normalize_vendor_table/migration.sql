/*
  Warnings:

  - You are about to drop the column `verification_notes` on the `Vendor` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `VendorUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "verification_notes",
ADD COLUMN     "verified_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "VendorUser" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verification_notes" TEXT;
