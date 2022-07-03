import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  const opt = req.query.opt || '';
  try {
    const users = await prisma.user.findMany({
      // where: {
      //   NOT: {
      //     roles: { contains: 'admin' },
      //   },
      // },
      // where: { unitId: { not: null } },
      include: {
        Unit: { select: { kode: true, nama: true } },
        Jabatan: { select: { kode: true, nama: true } },
      },
      orderBy: {
        created: 'desc',
      },
    });

    if (opt == 'select-props') {
      const props: any[] = [];
      users.forEach((user) => {
        props.push({ value: user.id, label: user.nama });
      });

      return res.json(props);
    }

    return res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
}
