import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function getKomentar(req: NextApiRequest, res: NextApiResponse) {
  const projectId = req.query.option as string;
  const type = req.query.extra as string;

  try {
    const rs = await prisma.komentar.findMany({
      where: { projectId: projectId, type: type },
      include: {
        User: {
          select: { nipp: true, nama: true },
        },
      },
    });

    return res.json(rs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
