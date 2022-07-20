-- AlterTable
ALTER TABLE "Kesiapan" ADD COLUMN     "total" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Rencana" ADD COLUMN     "tglKonfirmasi" TIMESTAMP(3),
ADD COLUMN     "tglSelesai" TIMESTAMP(3);
