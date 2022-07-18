import prisma from 'lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getResetPassword(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.query.option as string;
    // @ts-ignore
    const found = await prisma.resetPassword.findUnique({
      where: { token },
    });

    if (!found) return res.status(404).json({ message: 'Not Found' });
    return res.json(found);
  } catch (error) {
    console.log(error);
  }
}
