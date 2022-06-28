import prisma from 'lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getAdminProjects(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = req.session.user;
    if (!user?.roles.includes('admin')) return res.json([]);

    const [projects, newProjects, users] = await prisma.$transaction([
      prisma.project.findMany({
        where: { NOT: { mentorId: null } },
        select: {
          id: true,
          managerId: true,
          mentorId: true,
          judul: true,
          Unit: { select: { id: true, kode: true, nama: true } },
          Manager: {
            select: { id: true, nama: true, Jabatan: { select: { kode: true, nama: true } } },
          },
          Mentor: {
            select: { id: true, nama: true, Jabatan: { select: { kode: true, nama: true } } },
          },
        },
        orderBy: { created: 'desc' },
      }),

      // new projects
      prisma.project.findMany({
        where: { mentorId: null },
        select: {
          id: true,
          managerId: true,
          mentorId: true,
          judul: true,
          Unit: { select: { id: true, kode: true, nama: true } },
          Manager: {
            select: { id: true, nama: true, Jabatan: { select: { kode: true, nama: true } } },
          },
          Mentor: {
            select: { id: true, nama: true, Jabatan: { select: { kode: true, nama: true } } },
          },
        },
        orderBy: { created: 'desc' },
      }),

      // Mentors only
      prisma.user.findMany({
        // where: { unitId: { not: null } },
        where: {
          roles: { contains: 'mentor' },
        },
      }),
    ]);

    const mentors: any[] = [];
    users.forEach((user) => {
      mentors.push({ value: user.id, label: user.nama });
    });

    return res.json({ projects, newProjects, mentors });
  } catch (error) {
    console.log(error);
  }
}
