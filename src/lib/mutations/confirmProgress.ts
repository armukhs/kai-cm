import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function confirmProgress(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, confirm } = req.body;
    console.log('ID', id);

    const rs = await prisma.rencana.update({
      where: { id },
      data: {
        tglSelesai: confirm ? new Date() : null,
      },
    });

    res.json(rs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
