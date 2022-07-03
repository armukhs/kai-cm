import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function getInvitations(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.invitation.findMany({ orderBy: { created: 'desc' } });

    return res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
}
