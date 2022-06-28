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

  const [syncData, setSyncData] = useState(kesiapan);

  // useEffect(() => {
  //   if (data) {
  //     setSyncData(data.kesiapan);
  //   }
  // }, [data]);

  function bobotVal() {
    return (
      bobot.topLevel +
      bobot.unitStrukturVal +
      bobot.unitPeranVal +
      bobot.unitBudayaVal +
      bobot.unitKompetensiVal +
      bobot.unitLainnyaVal +
      bobot.topProsesLevel +
      bobot.topTeknologiLevel
    );
  }

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
            nilai={bobotVal()}
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
          <FormAnalisis project={project} data={syncData} canEdit={isMentor} mutate={mutate} />
        </Tabs.Tab>
      </Tabs>
    </>
  );
}
