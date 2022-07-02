import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import { __getProject } from 'lib/queries/getProject';
import cuid from 'cuid';

export default async function saveProgress(req: NextApiRequest, res: NextApiResponse) {
  const { rencanaId, type, progress, laporan } = req.body;
  console.log(rencanaId, type, progress, laporan);

  try {
    const rs = await prisma.progress.create({
      data: {
        id: cuid.slug(),
        rencanaId,
        type,
        progress,
        laporan,
      },
    });

    res.json(rs);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
}
