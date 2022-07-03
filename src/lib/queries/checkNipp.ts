import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function checkNipp(req: NextApiRequest, res: NextApiResponse) {
  const opt = req.query.opt;
  if (opt === undefined || opt == '') {
    return res.status(400).json({ message: 'Harus diisi' });
  }

  const nipp = Array.isArray(opt) ? opt[0] : opt;

  try {
    const [user, invitation] = await prisma.$transaction([
      prisma.user.findFirst({
        where: { nipp: nipp },
      }),

      prisma.invitation.findFirst({
        where: { nipp: nipp },
      }),
    ]);

    if (user) return res.status(400).json({ message: 'Sudah terdaftar sebagai user' });
    if (invitation) return res.status(400).json({ message: 'Sudah diundang' });

    return res.json({ message: 'Available' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
