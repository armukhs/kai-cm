/*
  Warnings:

  - Made the column `targetId` on table `Komentar` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Komentar" ALTER COLUMN "targetId" SET NOT NULL;
