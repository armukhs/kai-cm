import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions, SessionUser } from 'lib/session';
import prisma from 'lib/db';
import bcrypt from 'bcryptjs';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body;
  console.log(username, password);

  try {
    const found = await prisma.user.findFirst({
      where: {
        OR: [{ nipp: username }, { email: username }],
        deleted: null,
      },
      include: {
        Hash: true,
        Unit: {
          select: { nama: true, kode: true },
        },
        Jabatan: {
          select: { nama: true, kode: true },
        },
      },
    });

    if (!found) {
      return res.status(404).json({ message: 'Error username or password' });
    }

    console.log(found);

    const verified = bcrypt.compareSync(password, found.Hash?.hash as string);
    if (!verified) {
      return res.status(404).json({ message: '[02] Username/password salah.' });
    }

    let user: SessionUser = {
      isLoggedIn: true,
      id: found.id,
      nipp: found.nipp,
      email: found.email,
      nama: found.nama,
      roles: found.roles || '',
      unit: found.Unit?.nama || '',
      unitId: found.unitId || '',
      kodeUnit: found.Unit?.kode || '',
      jabatan: found.Jabatan?.nama || '',
      jabatanId: found.jabatanId || '',
      kodeJabatan: found.Jabatan?.kode || '',
    };

    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
