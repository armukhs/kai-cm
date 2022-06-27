import { Avatar, Group, Paper, Table, Tabs, Text } from '@mantine/core';
import Layout from 'components/Layout/Layout';
import PageTitle from 'components/PageTitle/PageTitle';
import { SessionUser } from 'lib/session';
import useAuthApi from 'lib/useAuthApi';
import { useEffect, useState } from 'react';
import BobotNilai from './BobotNilai';
import FormAnalisis from './FormAnalisis';

export default function Analisis({
  user,
  project,
  analisis,
  title,
}: {
  user: SessionUser;
  project: any;
  analisis: any;
  title: string;
}) {
  const { data, mutate } = useAuthApi('analisis', project.id);
  const isMentor = user.id == project.mentorId;

  const [syncData, setSyncData] = useState(analisis);

  useEffect(() => {
    if (data) {
      setSyncData(data.analisis);
    }
  }, [data]);

  function bobot() {
    return (
      analisis.topLevel +
      analisis.unitStrukturVal +
      analisis.unitPeranVal +
      analisis.unitBudayaVal +
      analisis.unitKompetensiVal +
      analisis.unitLainnyaVal +
      analisis.topProsesLevel +
      analisis.topTeknologiLevel
    );
  }

  return (
    <Layout title={`Analisis & Rekomendasi - ${project.judul}`} user={user} project={project}>
      {/* <h2 style={{ marginTop: 0, fontWeight: 500 }}>{title}</h2> */}
      <PageTitle prefix="" title="Analisis" />

      <Tabs
        variant="default"
        styles={{
          root: { marginTop: -12 },
        }}
      >
        <Tabs.Tab label="Bobot Perubahan">
          <BobotNilai
            nilai={bobot()}
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
                  <td align="center">{analisis.topLevel}</td>
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
                  <td align="center">{analisis.unitPeranVal}</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Budaya Kerja</td>
                  <td align="center">{analisis.unitBudayaVal}</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Knowledge, Skill, Ability</td>
                  <td align="center">{analisis.unitKompetensiVal}</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Struktur Organisasi</td>
                  <td align="center">{analisis.unitStrukturVal}</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Pola Kerja, Dll.</td>
                  <td align="center">{analisis.unitLainnyaVal}</td>
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
                  <td align="center">{analisis.topProsesLevel}</td>
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
                  <td align="center">{analisis.topTeknologiLevel}</td>
                </tr>
              </tbody>
            </Table>
          </Paper>
        </Tabs.Tab>
        <Tabs.Tab label="Analisis Kesiapan">
          <FormAnalisis data={syncData} canEdit={isMentor} mutate={mutate} />
        </Tabs.Tab>
      </Tabs>
    </Layout>
  );
}
