import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function getProgress(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.option as string;
    const [rencana, progresses] = await prisma.$transaction([
      prisma.$queryRaw`SELECT "Rencana".*, "managerId", "staffId", "mentorId"
      FROM "Rencana" LEFT JOIN "Project" ON "Rencana"."projectId"="Project"."id"
      WHERE "Rencana"."id"=${id} LIMIT 1;
      `,

      prisma.progress.findMany({
        where: { rencanaId: id },
      }),
    ]);

    console.log('RENCANA', rencana);
    if (rencana.length == 0) return res.status(400).json({ message: 'ID not defined' });

    return res.json({ rencana: rencana[0], progresses });
  } catch (error) {
    console.log(error);
  }
}
