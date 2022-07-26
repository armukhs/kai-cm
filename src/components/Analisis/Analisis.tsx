import { Avatar, Group, Paper, Table, Tabs, Text } from '@mantine/core';
import Layout from 'components/Layout/Layout';
import PageTitle from 'components/PageTitle/PageTitle';
import Pojo from 'components/Pojo';
import { SessionUser } from 'lib/session';
import useAuthApi from 'lib/useAuthApi';
import { useEffect, useState } from 'react';
import { KeyedMutator } from 'swr';
import BobotNilai from './BobotNilai';
import FormAnalisis from './FormAnalisis';

export default function Analisis({
  user,
  project,
  bobot,
  kesiapan,
  units,
  title,
  mutate,
}: {
  user: SessionUser;
  project: any;
  bobot: any;
  kesiapan: any;
  units: any[];
  title: string;
  mutate: KeyedMutator<any>;
}) {
  // const { data, mutate } = useAuthApi('analisis', project.id);
  const isMentor = user.id == project.mentorId;

  // const [syncData, setSyncData] = useState(kesiapan);

  return (
    <>
      <Tabs
        variant="default"
        styles={{
          root: { marginTop: -12 },
        }}
      >
        <Tabs.Tab label="Bobot Perubahan">
          <BobotNilai
            nilai={bobot.total}
            info="Berdasar jumlah dan jenis unit-unit terdampak beserta level organisasinya."
          />

          <Paper
            withBorder
            sx={(theme) => ({ borderColor: theme.colors.gray[5], overflow: 'hidden' })}
          >
            <Table fontSize={13.5}>
              <tbody style={{ verticalAlign: 'top' }}>
                <tr style={{ backgroundColor: '#fcfcfc' }}>
                  <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                    <Text my={3} size="sm" weight={600}>
                      Unit Perubahan
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Level Unit Perubahan Tertinggi</td>
                  <td align="center">{bobot.topLevel}</td>
                </tr>

                <tr style={{ backgroundColor: '#fcfcfc' }}>
                  <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                    <Text my={3} size="sm" weight={600}>
                      Tingkat Perubahan
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Peran &amp; Tanggugjawab</td>
                  <td align="center">{bobot.unitPeranVal}</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Budaya Kerja</td>
                  <td align="center">{bobot.unitBudayaVal}</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Knowledge, Skill, Ability</td>
                  <td align="center">{bobot.unitKompetensiVal}</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Struktur Organisasi</td>
                  <td align="center">{bobot.unitStrukturVal}</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Pola Kerja, Dll.</td>
                  <td align="center">{bobot.unitLainnyaVal}</td>
                </tr>

                <tr style={{ backgroundColor: '#fcfcfc' }}>
                  <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                    <Text my={3} size="sm" weight={600}>
                      Tingkat Perubahan Proses Bisnis
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Level Unit Perubahan Tertinggi</td>
                  <td align="center">{bobot.topProsesLevel}</td>
                </tr>

                <tr style={{ backgroundColor: '#fcfcfc' }}>
                  <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                    <Text my={3} size="sm" weight={600}>
                      Tingkat Perubahan Teknologi
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Level Unit Perubahan Tertinggi</td>
                  <td align="center">{bobot.topTeknologiLevel}</td>
                </tr>
              </tbody>
            </Table>
          </Paper>
        </Tabs.Tab>

        <Tabs.Tab label="Analisis Kesiapan">
          <FormAnalisis project={project} canEdit={isMentor} />
        </Tabs.Tab>

        {project.tglKonfirmasi && (
          <Tabs.Tab label="Risiko Perubahan">
            <h3>Risiko Perubahan dan Rekomendasi</h3>
            <table style={{ borderCollapse: 'collapse' }}>
              <tbody style={{ verticalAlign: 'middle' }}>
                <tr style={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '6px 20px 6px 0' }}>Bobot&nbsp;Perubahan</td>
                  <td style={{ padding: '6px 0 6px 20px' }}>{bobot.total}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '6px 20px 6px 0' }}>Kesiapan</td>
                  <td style={{ padding: '6px 0 6px 20px' }}>{kesiapan.total.toPrecision(3)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '6px 20px 6px 0' }}>Kategori Risiko</td>
                  <td style={{ padding: '6px 0 6px 20px', fontWeight: 700 }}>
                    {kategoriRisiko(bobot.total, kesiapan.total)}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '6px 20px 6px 0' }}>Keterangan</td>
                  <td style={{ padding: '6px 0 6px 20px', fontWeight: 400 }}>
                    {deskripsiRisiko(kategoriRisiko(bobot.total, kesiapan.total))}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '6px 20px 6px 0' }}>Rekomendasi</td>
                  <td style={{ padding: '6px 0 6px 20px', fontWeight: 400 }}>
                    {rekomendasi(kategoriRisiko(bobot.total, kesiapan.total))}
                  </td>
                </tr>
              </tbody>
            </table>
          </Tabs.Tab>
        )}
      </Tabs>
    </>
  );
}

function kategoriRisiko(bobot: number, kesiapan: number) {
  let kategori = 'Low Risk';
  if (bobot >= 10 && kesiapan < 10) kategori = 'High Risk';
  else if (bobot >= 10 && kesiapan >= 10) kategori = 'Medium 1';
  else if (bobot < 10 && kesiapan < 10) kategori = 'Medium 2';
  return kategori;
}

function deskripsiRisiko(kategori: string) {
  switch (kategori) {
    case 'Low Risk':
      return 'Perubahan berdampak kecil pada organisasi dan kesiapan organisasi dalam menghadapi perubahan tinggi.';
    case 'High Risk':
      return 'Perubahan berdampak besar pada organisasi dan kesiapan organisasi dalam menghadapi perubahan rendah.';
    case 'Medium 1':
      return 'Perubahan berdampak besar pada organisasi dan kesiapan organisasi dalam menghadapi perubahan tinggi.';
    case 'Medium 2':
      return 'Perubahan berdampak kecil pada organisasi dan kesiapan organisasi dalam menghadapi perubahan rendah.';
    default:
      return 'Error';
  }
}

function rekomendasi(kategori: string) {
  switch (kategori) {
    case 'Low Risk':
      return 'Role & Responsibility pada Manajer Proyek, Monitoring & Evaluasi oleh CM Officer.';
    case 'High Risk':
      return 'Role & Responsibility oleh CM Officer dibantu Manajer Proyek; Monitoring & Evaluasi oleh CM Head.';
    case 'Medium 1':
      return 'Role & Responsibility kolaborasi antara Manajer Proyek & CM Officer, Monitoring & Evaluasi oleh CM Head.';
    case 'Medium 2':
      return 'Role & Responsibility kolaborasi antara Manajer Proyek & CM Officer, Monitoring & Evaluasi oleh CM Head.';
    default:
      return 'Error';
  }
}

/*

4.	Rekomendasi yang muncul terdiri dari 3 (tiga) kategori:
a.	*LOW RISK* – Role & Responsibility pada Manajer Proyek, Monitoring & Evaluasi oleh CM Officer.
b.	*MEDIUM RISK* - Role & Responsibility kolaborasi antara Manajer Proyek & CM Officer, Monitoring & Evaluasi oleh CM Head.
c.	*HIGH RISK* - Role & Responsibility oleh CM Officer dibantu Manajer Proyek; Monitoring & Evaluasi oleh CM Head

*/
