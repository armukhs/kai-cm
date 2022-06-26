import prisma from 'lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getProject(req: NextApiRequest, res: NextApiResponse) {
  try {
    const projectId = req.query.option as string;
    const project = await __getProject(projectId);
    return res.json(project);
  } catch (error) {
    console.log(error);
  }
}

export async function __getProject(projectId: string) {
  try {
    const project = await prisma.project.findFirst({
      where: { id: projectId },
      include: {
        Unit: { select: { id: true, kode: true, nama: true } },
        Manager: {
          select: { id: true, nama: true, Jabatan: { select: { kode: true, nama: true } } },
        },
        Mentor: {
          select: { id: true, nama: true, Jabatan: { select: { kode: true, nama: true } } },
        },
      },
    });

    return project;
  } catch (error) {
    console.log(error);
  }
}
