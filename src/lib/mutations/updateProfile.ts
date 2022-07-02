import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import { SessionUser } from 'lib/session';

export default async function updateProfile(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, nama } = req.body;
    console.log(id, nama);

    const rs = await prisma.user.update({
      where: { id: id },
      data: { nama: nama },
    });

    let sessionUser = { ...req.session.user };
    sessionUser.nama = rs.nama;

    req.session.user = sessionUser as SessionUser;
    await req.session.save();

    res.json(sessionUser);
  } catch (error) {
    res.status(500).json(error);
  }
}
