import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import cuid from 'cuid';

export default async function registerProject(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { unitId, managerId, judul, deskripsi, tujuan, target, tglMulai, tglSelesai } = req.body;
    // console.log(unitId, managerId, judul, deskripsi, tujuan, target, tglMulai, tglSelesai);
    const data = {
      unitId: unitId,
      managerId: managerId,
      judul: judul,
      deskripsi: deskripsi,
      tujuan: tujuan,
      target: target,
      tglMulai: tglMulai,
      tglSelesai: tglSelesai,
    };
    console.log(data);

    const rs = await prisma.project.create({
      data: {
        id: cuid.slug(),
        unitId: unitId,
        managerId: managerId,
        judul: judul,
        deskripsi: deskripsi,
        tujuan: tujuan,
        target: target,
        tglMulai: tglMulai || null,
        tglSelesai: tglSelesai || null,
        Kesiapan: {
          create: {},
        },
      },
    });
    console.log(rs);

    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
}
