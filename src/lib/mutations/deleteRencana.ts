import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function deleteRencana(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;
    console.log('ID', id);

    const [units, progress, rs] = await prisma.$transaction([
      prisma.unitRencana.deleteMany({
        where: { rencanaId: id },
      }),
      prisma.progress.deleteMany({
        where: { rencanaId: id },
      }),
      prisma.rencana.delete({
        where: { id: id },
      }),
    ]);

    // if (!rs) {
    console.log('RS', rs);
    // } else {
    console.log('UNITS', units);
    console.log('PROGRESS', progress);
    // }

    res.json(rs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
