import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

// Daftar rencana dalam sebuah project plus jumlah progres plus tgl mutakhir progress

export default async function getProgressIndex(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.option as string;
    const [project, progresses] = await prisma.$transaction([
      prisma.project.findFirst({
        where: { id: id },
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

      prisma.$queryRaw`SELECT
        "R"."id",
        "R"."type",
        "R"."rencana",
        COUNT("P"."id") as "progCount"
      FROM
        "Rencana" "R"
        LEFT JOIN "Progress" "P" on "R"."id" = "P"."rencanaId"
      WHERE
        "R"."projectId" = ${id}
      group by
        "R"."id"
      `,
    ]);

    return res.json({
      project: JSON.parse(JSON.stringify(project)),
      progresses: JSON.parse(JSON.stringify(progresses)),
    });
  } catch (error) {
    console.log(error);
  }
}
