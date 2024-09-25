/*
  Warnings:

  - You are about to drop the column `qrCodeUrl` on the `Tables` table. All the data in the column will be lost.
  - Added the required column `qrCodeImageUrl` to the `Tables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tables" DROP COLUMN "qrCodeUrl",
ADD COLUMN     "qrCodeImageUrl" TEXT NOT NULL;
