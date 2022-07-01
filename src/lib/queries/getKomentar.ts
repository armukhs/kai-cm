import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function getKomentar(req: NextApiRequest, res: NextApiResponse) {
  const type = req.query.option as string;
  const targetId = req.query.extra as string;
  console.log(type, targetId);

  try {
    const rs = await prisma.komentar.findMany({
      where: { targetId: targetId, type: type },
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
