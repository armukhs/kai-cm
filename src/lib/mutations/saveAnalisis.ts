import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function saveAnalisis(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { projectId, data, isFinal } = req.body;

    console.log('projectId', projectId);
    console.log('isFinal', isFinal);
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
    // console.log('dataKesiapan', dataKesiapan);

    const rs = await prisma.kesiapan.update({
      where: { projectId: projectId },
      data: {
        sepakat_dengan_misi: data.sepakat_dengan_misi,
        komunikasi_terbuka: data.komunikasi_terbuka,
        percaya_bawahan: data.percaya_bawahan,
        ide_bawahan: data.ide_bawahan,
        interaksi_bersahabat: data.interaksi_bersahabat,
        saling_percaya: data.saling_percaya,
        kinerja_teamwork: data.kinerja_teamwork,
        lingkungan_koperatif: data.lingkungan_koperatif,
        saling_menghargai: data.saling_menghargai,
        kompetensi_memadai: data.kompetensi_memadai,
        ekspektasi_realistis: data.ekspektasi_realistis,
        komunikasi_intens: data.komunikasi_intens,
        tanpa_isu_otoritas: data.tanpa_isu_otoritas,
        tanpa_isu_hilang_kerja: data.tanpa_isu_hilang_kerja,
        optimis_terhadap_hasil: data.optimis_terhadap_hasil,
        nyaman_dengan_hasil: data.nyaman_dengan_hasil,
        total: total,
      },
    });

    // console.log('RS', rs);
    const rs2 = await prisma.project.update({
      where: { id: projectId },
      data: { tglKonfirmasi: isFinal ? new Date() : null },
    });
    // console.log(rs2);

    return res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
}
