import prisma from 'lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getInvitation(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.query.option as string;
    const rs = await prisma.invitation.findFirst({
      where: { token: token },
    });
    if (rs) return res.json(rs);
    res.status(404).json({ message: 'Not found' });
  } catch (error) {
    res.status(500).json(error);
  }
}
