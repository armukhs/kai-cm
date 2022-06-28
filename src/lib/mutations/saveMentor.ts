import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import { __getProject } from 'lib/queries/getProject';

export default async function saveMentor(req: NextApiRequest, res: NextApiResponse) {
  const { projectId, mentorId } = req.body;

  try {
    const rs = await prisma.project.update({
      where: { id: projectId },
      data: {
        mentorId: mentorId,
      },
    });

    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
}
