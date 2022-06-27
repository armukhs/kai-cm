import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function deleteRencana(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;

    const [deps, rs] = await prisma.$transaction([
      prisma.unitRencana.deleteMany({
        where: { rencanaId: id },
      }),
      prisma.rencana.delete({
        where: { id: id },
      }),
    ]);

    if (!rs) {
      console.log('Error');
    } else {
      console.log(deps);
    }

    res.json(rs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
