import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import bcrypt from 'bcryptjs';

export default async function updatePassword(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, password } = req.body;
    const hash = bcrypt.hashSync(password);
    await prisma.hash.update({
      where: { userId: id },
      data: { hash: hash },
    });

    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json(error);
  }
}
