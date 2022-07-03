import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import cuid from 'cuid';
import bcrypt from 'bcryptjs';
import { SessionUser } from 'lib/session';

export default async function newUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { invitationId, unitId, jabatan, jabatanId, nipp, email, nama, roles, password } =
      req.body;
    const id = cuid.slug();
    const hash = bcrypt.hashSync(password);
    const [newUser, found, invitation] = await prisma.$transaction([
      prisma.user.create({
        data: {
          id: id,
          nama: nama,
          nipp: nipp,
          email: email,
          jabatanId: jabatanId,
          unitId: unitId,
          roles: roles,
          Hash: {
            create: { hash: hash },
          },
        },
      }),
      prisma.user.findFirst({
        where: { email: email },
        include: {
          Unit: {
            select: { nama: true, kode: true },
          },
          Jabatan: {
            select: { nama: true, kode: true },
          },
        },
      }),
      prisma.invitation.update({
        where: { id: invitationId },
        data: { token: '---' },
      }),
    ]);
    console.log('FOUND NEW USER', found);

    const user: SessionUser = {
      isLoggedIn: true,
      id: found?.id as string,
      nipp: found?.nipp as string,
      email: found?.email as string,
      nama: found?.nama as string,
      roles: found?.roles || '',
      unit: found?.Unit?.nama || '',
      unitId: found?.unitId || '',
      kodeUnit: found?.Unit?.kode || '',
      jabatan: found?.Jabatan?.nama || '',
      jabatanId: found?.jabatanId || '',
      kodeJabatan: found?.Jabatan?.kode || '',
    };

    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
