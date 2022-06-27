import prisma from 'lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getRencana(req: NextApiRequest, res: NextApiResponse) {
  try {
    const type = req.query.option as string;
    const projectId = req.query.extra as string;
    // @ts-ignore
    const { project, rencanas } = await __getRencana(type, projectId);
    return res.json({ project, rencanas });
  } catch (error) {
    console.log(error);
  }
}

export async function __getRencana(type: string, projectId: string) {
  try {
    const [project, rencanas] = await prisma.$transaction([
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
          tglApproval: true,
          Unit: {
            select: {
              nama: true,
              kode: true,
            },
          },
        },
      }),

      prisma.rencana.findMany({
        where: {
          projectId: projectId,
          type: type,
        },
        include: {
          PIC: true,
          UnitRencana: true,
          _count: {
            select: { Progress: true },
          },
        },
        orderBy: { created: 'asc' },
      }),
    ]);

    return {
      project: JSON.parse(JSON.stringify(project)),
      rencanas: JSON.parse(JSON.stringify(rencanas)),
    };
  } catch (error) {}
}
