import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function deactivateUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;
    const rs = await prisma.user.update({
      where: { id },
      data: {
        deleted: new Date(),
      },
    });

    res.json(rs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
