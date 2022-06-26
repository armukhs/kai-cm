import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import { __getProject } from 'lib/queries/getProject';

export default async function saveProject(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user;
  console.log(user);

  try {
    const { id, judul, deskripsi, tujuan, target, tglMulai, tglSelesai } = req.body;
    console.log('tglMulai', tglMulai);
    console.log('tglSelesai', tglSelesai);

    await prisma.project.update({
      where: { id: id },
      data: {
        judul: judul,
        deskripsi: deskripsi,
        tujuan: tujuan,
        target: target,
        tglMulai: tglMulai || null,
        tglSelesai: tglSelesai || null,
      },
    });

    const project = await __getProject(id);

    res.json(project);
  } catch (error) {
    res.status(500).json(error);
  }
}
