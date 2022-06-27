import prisma from 'lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getProjects(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = req.session.user;
    // @ts-ignore
    const { projects, assignments } = await __getProjects(user?.id as string);
    return res.json({ projects, assignments });
  } catch (error) {
    console.log(error);
  }
}

export async function __getProjects(userId: string) {
  try {
    const rs = await prisma.project.findMany({
      where: { OR: [{ managerId: userId }, { mentorId: userId }, { staffId: userId }] },
      select: {
        id: true,
        managerId: true,
        mentorId: true,
        staffId: true,
        judul: true,
        Unit: { select: { id: true, kode: true, nama: true } },
        Manager: {
          select: { id: true, nama: true, Jabatan: { select: { kode: true, nama: true } } },
        },
        Mentor: {
          select: { id: true, nama: true, Jabatan: { select: { kode: true, nama: true } } },
        },
      },
    });

    const projects = rs.filter((p) => p.managerId == userId || p.staffId == userId);
    const assignments = rs.filter((p) => p.mentorId == userId);

    return { projects, assignments };
  } catch (error) {
    console.log(error);
  }
}
