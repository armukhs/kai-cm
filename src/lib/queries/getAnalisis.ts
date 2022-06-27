import prisma from 'lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getAnalisis(req: NextApiRequest, res: NextApiResponse) {
  try {
    const projectId = req.query.option as string;
    // @ts-ignore
    const { project, bobot, kesiapan, units } = await __getAnalisis(projectId);
    return res.json({ project, bobot, kesiapan, units });
  } catch (error) {
    console.log(error);
  }
}

interface IUnitPerubahan {
  projectId: string;
  type: string;
  id: string;
  parentId: string;
  kode: string;
  level: number;
  nama: string;
}

export async function __getAnalisis(projectId: string) {
  try {
    const [project, kesiapan, units] = await prisma.$transaction([
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

      prisma.kesiapan.findUnique({ where: { projectId: projectId } }),

      prisma.$queryRaw`SELECT up."projectId", up."type",
      u."id", u."parentId", u."kode", u."level", u."nama"
      from "UnitPerubahan" up left join "Unit" u on up."unitId"=u.id
      where up."projectId"=${projectId}
      order by type`,
    ]);

    if (!project) throw new Error('Project not found');

    const levels = [5, 4, 3, 2, 1];

    let topLevel = 0;
    let topLevelCount = 0;
    let topProsesLevel = 0;
    let topTeknologiLevel = 0;
    const unitProsesCount = units.filter((u: any) => u.type == 'proses').length;
    const unitReknologiCount = units.filter((u: any) => u.type == 'teknologi').length;
    //
    const unitStrukturCount = units.filter((u: any) => u.type == 'struktur').length;
    const unitPeranCount = units.filter((u: any) => u.type == 'peran').length;
    const unitBudayaCount = units.filter((u: any) => u.type == 'budaya').length;
    const unitKompetensiCount = units.filter((u: any) => u.type == 'kompetensi').length;
    const unitLainnyaCount = units.filter((u: any) => u.type == 'lainnya').length;
    //
    const unitStrukturVal = unitStrukturCount > 0 ? 1 : 0;
    const unitPeranVal = unitPeranCount > 0 ? 1 : 0;
    const unitBudayaVal = unitBudayaCount > 0 ? 1 : 0;
    const unitKompetensiVal = unitKompetensiCount > 0 ? 1 : 0;
    const unitLainnyaVal = unitLainnyaCount > 0 ? 1 : 0;

    units.forEach((unit: any) => {
      if (topLevel == 0) {
        topLevel = levels[unit.level];
      } else {
        if (levels[unit.level] > topLevel) {
          topLevel = levels[unit.level];
        }
      }
    });

    units.forEach((unit: any) => {
      if (levels[unit.level] == topLevel) topLevelCount++;
    });

    // topProsesLevel
    units
      .filter((u: any) => u.type == 'proses')
      .forEach((unit: any) => {
        if (topProsesLevel == 0) {
          topProsesLevel = levels[unit.level];
        } else {
          if (levels[unit.level] > topProsesLevel) {
            topProsesLevel = levels[unit.level];
          }
        }
      });

    // topTeknologiLevel
    units
      .filter((u: any) => u.type == 'teknologi')
      .forEach((unit: any) => {
        if (topTeknologiLevel == 0) {
          topTeknologiLevel = levels[unit.level];
        } else {
          if (levels[unit.level] > topTeknologiLevel) {
            topTeknologiLevel = levels[unit.level];
          }
        }
      });

    // console.log(Date.now() - start);

    if (topLevel == 4 && topLevelCount > 1) topLevel = 5;

    const bobot = {
      topLevel,
      topLevelCount,
      topProsesLevel,
      topTeknologiLevel,
      unitProsesCount,
      unitReknologiCount,
      unitStrukturCount,
      unitPeranCount,
      unitBudayaCount,
      unitKompetensiCount,
      unitLainnyaCount,
      unitStrukturVal,
      unitPeranVal,
      unitBudayaVal,
      unitKompetensiVal,
      unitLainnyaVal,
    };

    const _kesiapan = { ...kesiapan };
    delete _kesiapan.updated;

    // const analisis = {
    //   kesiapan: JSON.parse(JSON.stringify(kesiapan)),
    //   units: units,
    // };

    return {
      project: JSON.parse(JSON.stringify(project)),
      bobot,
      kesiapan: _kesiapan,
      units,
    };
  } catch (error) {
    console.log(error);
  }
}
