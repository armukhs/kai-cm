import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function deletePerubahan(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;

    //
    // IT SHOULD BE DONE USING DELETE CASCADE ON TABLE DEFINITION
    //

    const [deps, rs] = await prisma.$transaction([
      prisma.unitPerubahan.deleteMany({
        where: { perubahanId: id },
      }),
      prisma.perubahan.delete({
        where: { id: id },
      }),
    ]);

    if (!rs) {
      console.log('Error');
    } else {
      console.log(deps);
    }

    res.json(rs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
