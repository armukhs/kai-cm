import prisma from 'lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getPerubahan(req: NextApiRequest, res: NextApiResponse) {
  try {
    const type = req.query.option as string;
    const projectId = req.query.extra as string;
    // @ts-ignore
    const { project, perubahans } = await __getPerubahan(type, projectId);
    return res.json({ project, perubahans });
  } catch (error) {
    console.log(error);
  }
}

export async function __getPerubahan(type: string, projectId: string) {
  try {
    const [project, perubahans] = await prisma.$transaction([
      prisma.project.findFirst({
        where: { id: projectId },
        select: {
          id: true,
          unitId: true,
          managerId: true,
          staffId: true,
          mentorId: true,
          judul: true,
          tglBatal: true,
          tglKonfirmasi: true,
          Unit: {
            select: {
              nama: true,
              kode: true,
            },
          },
        },
      }),

      prisma.perubahan.findMany({
        where: {
          projectId: projectId,
          type: type,
        },
        include: { PIC: true, UnitPerubahan: true },
        orderBy: { created: 'asc' },
      }),
    ]);

    return {
      project: JSON.parse(JSON.stringify(project)),
      perubahans: JSON.parse(JSON.stringify(perubahans)),
    };
  } catch (error) {}
}
