import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function getProgress(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.option as string;
    const progress = await prisma.progress.findMany({
      where: { rencanaId: id },
    });

    return res.json(progress);
  } catch (error) {
    console.log(error);
  }
}
