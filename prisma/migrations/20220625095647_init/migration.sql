-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "parentId" TEXT,
    "kode" TEXT NOT NULL,
    "tipe" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "nama" TEXT NOT NULL,
    "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3),

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jabatan" (
    "id" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "tipe" TEXT,
    "nama" TEXT NOT NULL,
    "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3),

    CONSTRAINT "Jabatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "deleted" TIMESTAMP(3),
    "unitId" TEXT,
    "jabatanId" TEXT,
    "nipp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "roles" TEXT,
    "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hash" (
    "userId" TEXT NOT NULL,
    "hash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,
    "mentorId" TEXT,
    "staffId" TEXT,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "tujuan" TEXT,
    "target" TEXT,
    "tglMulai" DATE,
    "tglSelesai" DATE,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "tglKonfirmasi" DATE,
    "tglBatal" DATE,
    "proses" INTEGER NOT NULL DEFAULT 0,
    "teknologi" INTEGER NOT NULL DEFAULT 0,
    "budaya" INTEGER NOT NULL DEFAULT 0,
    "kompetensi" INTEGER NOT NULL DEFAULT 0,
    "peran" INTEGER NOT NULL DEFAULT 0,
    "struktur" INTEGER NOT NULL DEFAULT 0,
    "rencana" INTEGER NOT NULL DEFAULT 0,
    "progres" INTEGER NOT NULL DEFAULT 0,
    "lainnya" INTEGER NOT NULL DEFAULT 0,
    "tagarKAI" TEXT,
    "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perubahan" (
    "id" TEXT NOT NULL,
    "picId" TEXT,
    "projectId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "kondisi" TEXT,
    "perubahan" TEXT NOT NULL,
    "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3),

    CONSTRAINT "Perubahan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitPerubahan" (
    "type" TEXT NOT NULL DEFAULT E'',
    "projectId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "perubahanId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Komentar" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Komentar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "fromName" TEXT NOT NULL,
    "fromEmail" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nipp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "jabatanId" TEXT NOT NULL,
    "unitId" TEXT,
    "roles" TEXT NOT NULL,
    "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rencana" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "picId" TEXT,
    "type" TEXT NOT NULL,
    "rencana" TEXT,
    "audien" TEXT NOT NULL,
    "waktu" TEXT NOT NULL,
    "tempat" TEXT NOT NULL,
    "tolokUkur" TEXT NOT NULL,
    "monitoring" TEXT NOT NULL,
    "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3),

    CONSTRAINT "Rencana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitRencana" (
    "unitId" TEXT NOT NULL,
    "rencanaId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Kesiapan" (
    "projectId" TEXT NOT NULL,
    "sepakat_dengan_misi" INTEGER NOT NULL DEFAULT 0,
    "komunikasi_terbuka" INTEGER NOT NULL DEFAULT 0,
    "percaya_bawahan" INTEGER NOT NULL DEFAULT 0,
    "ide_bawahan" INTEGER NOT NULL DEFAULT 0,
    "interaksi_bersahabat" INTEGER NOT NULL DEFAULT 0,
    "saling_percaya" INTEGER NOT NULL DEFAULT 0,
    "kinerja_teamwork" INTEGER NOT NULL DEFAULT 0,
    "lingkungan_koperatif" INTEGER NOT NULL DEFAULT 0,
    "saling_menghargai" INTEGER NOT NULL DEFAULT 0,
    "kompetensi_memadai" INTEGER NOT NULL DEFAULT 0,
    "ekspektasi_realistis" INTEGER NOT NULL DEFAULT 0,
    "komunikasi_intens" INTEGER NOT NULL DEFAULT 0,
    "tanpa_isu_otoritas" INTEGER NOT NULL DEFAULT 0,
    "tanpa_isu_hilang_kerja" INTEGER NOT NULL DEFAULT 0,
    "optimis_terhadap_hasil" INTEGER NOT NULL DEFAULT 0,
    "nyaman_dengan_hasil" INTEGER NOT NULL DEFAULT 0,
    "updated" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "rencanaId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "progress" TEXT NOT NULL,
    "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KomentarProgress" (
    "id" TEXT NOT NULL,
    "rencanaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KomentarProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Unit_kode_key" ON "Unit"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "Jabatan_kode_key" ON "Jabatan"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "User_jabatanId_key" ON "User"("jabatanId");

-- CreateIndex
CREATE UNIQUE INDEX "User_nipp_key" ON "User"("nipp");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hash_userId_key" ON "Hash"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UnitPerubahan_unitId_perubahanId_key" ON "UnitPerubahan"("unitId", "perubahanId");

-- CreateIndex
CREATE UNIQUE INDEX "UnitRencana_unitId_rencanaId_key" ON "UnitRencana"("unitId", "rencanaId");

-- CreateIndex
CREATE UNIQUE INDEX "Kesiapan_projectId_key" ON "Kesiapan"("projectId");

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jabatan" ADD CONSTRAINT "Jabatan_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_jabatanId_fkey" FOREIGN KEY ("jabatanId") REFERENCES "Jabatan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hash" ADD CONSTRAINT "Hash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perubahan" ADD CONSTRAINT "Perubahan_picId_fkey" FOREIGN KEY ("picId") REFERENCES "Jabatan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perubahan" ADD CONSTRAINT "Perubahan_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitPerubahan" ADD CONSTRAINT "UnitPerubahan_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitPerubahan" ADD CONSTRAINT "UnitPerubahan_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitPerubahan" ADD CONSTRAINT "UnitPerubahan_perubahanId_fkey" FOREIGN KEY ("perubahanId") REFERENCES "Perubahan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Komentar" ADD CONSTRAINT "Komentar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Komentar" ADD CONSTRAINT "Komentar_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rencana" ADD CONSTRAINT "Rencana_picId_fkey" FOREIGN KEY ("picId") REFERENCES "Jabatan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rencana" ADD CONSTRAINT "Rencana_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitRencana" ADD CONSTRAINT "UnitRencana_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitRencana" ADD CONSTRAINT "UnitRencana_rencanaId_fkey" FOREIGN KEY ("rencanaId") REFERENCES "Rencana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kesiapan" ADD CONSTRAINT "Kesiapan_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_rencanaId_fkey" FOREIGN KEY ("rencanaId") REFERENCES "Rencana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KomentarProgress" ADD CONSTRAINT "KomentarProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KomentarProgress" ADD CONSTRAINT "KomentarProgress_rencanaId_fkey" FOREIGN KEY ("rencanaId") REFERENCES "Rencana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
