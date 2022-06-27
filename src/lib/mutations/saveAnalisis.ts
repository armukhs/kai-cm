import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function saveAnalisis(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { projectId, data, isFinal } = req.body;

    console.log('projectId', projectId);
    console.log('isFinal', isFinal);
    console.log('data', data);

    const rs = await prisma.kesiapan.update({
      where: { projectId: projectId },
      data: data,
    });

    console.log('rs', rs);
    if (isFinal) {
      await prisma.project.update({
        where: { id: projectId },
        data: { tglKonfirmasi: new Date() },
      });
    } else {
      await prisma.project.update({
        where: { id: projectId },
        data: { tglKonfirmasi: null },
      });
    }

    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
}
