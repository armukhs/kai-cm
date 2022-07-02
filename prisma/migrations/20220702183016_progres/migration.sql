/*
  Warnings:

  - Added the required column `laporan` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `progress` on the `Progress` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Progress" ADD COLUMN     "laporan" TEXT NOT NULL,
DROP COLUMN "progress",
ADD COLUMN     "progress" INTEGER NOT NULL;
