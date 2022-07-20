import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function saveAnalisis(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { projectId, data, isFinal } = req.body;

    console.log('projectId', projectId);
    console.log('isFinal', isFinal);
    // console.log('data', data);
    const total =
      (data.sepakat_dengan_misi +
        data.komunikasi_terbuka +
        data.percaya_bawahan +
        data.ide_bawahan) /
        4 +
      (data.interaksi_bersahabat +
        data.saling_percaya +
        data.kinerja_teamwork +
        data.lingkungan_koperatif +
        data.saling_menghargai) /
        5 +
      (data.kompetensi_memadai + data.ekspektasi_realistis + data.komunikasi_intens) / 3 +
      (data.tanpa_isu_otoritas +
        data.tanpa_isu_hilang_kerja +
        data.optimis_terhadap_hasil +
        data.nyaman_dengan_hasil) /
        4;

    const dataKesiapan = { ...data };
    dataKesiapan.total = total;
    console.log('dataKesiapan', dataKesiapan);

    const rs = await prisma.kesiapan.update({
      where: { projectId: projectId },
      data: dataKesiapan, // { ...data, total: total },
    });

    console.log('rs', rs);
    if (isFinal) {
      await prisma.project.update({
        where: { id: projectId },
        data: { tglKonfirmasi: new Date() },
      });
    } else {
      await prisma.project.update({
        where: { id: projectId },
        data: { tglKonfirmasi: null },
      });
    }

    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
}
