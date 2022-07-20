import prisma from 'lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getKesiapan(req: NextApiRequest, res: NextApiResponse) {
  try {
    const projectId = req.query.option as string;
    const rs = await prisma.kesiapan.findFirst({
      where: { projectId: projectId },
    });
    return res.json(rs);
  } catch (error) {
    console.log(error);
  }
}
