import { Button, Checkbox, NativeSelect, Paper, Table, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import Pojo from 'components/Pojo';
import fetchJson from 'lib/fetchJson';
import useAuthApi from 'lib/useAuthApi';
import { createPostData } from 'lib/utils';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';
import BobotNilai from './BobotNilai';

export default function FormAnalisis({ project, canEdit }: { project: any; canEdit: boolean }) {
  const { data, error, mutate: mutateKesiapan } = useAuthApi('kesiapan', project.id);

  const form = useForm({
    initialValues: { ...data },
  });

  function kepemimpinan() {
    const sum =
      parseInt(form.values['sepakat_dengan_misi']) +
      parseInt(form.values['komunikasi_terbuka']) +
      parseInt(form.values['percaya_bawahan']) +
      parseInt(form.values['ide_bawahan']);
    return sum == 0 ? 0 : sum / 4;
  }

  function lingkungan() {
    const sum =
      parseInt(form.values['interaksi_bersahabat']) +
      parseInt(form.values['saling_percaya']) +
      parseInt(form.values['kinerja_teamwork']) +
      parseInt(form.values['lingkungan_koperatif']) +
      parseInt(form.values['saling_menghargai']);
    return sum == 0 ? 0 : sum / 5;
  }

  function komitmen() {
    const sum =
      parseInt(form.values['kompetensi_memadai']) +
      parseInt(form.values['ekspektasi_realistis']) +
      parseInt(form.values['komunikasi_intens']);
    return sum == 0 ? 0 : sum / 3;
  }

  function resistensi() {
    const sum =
      parseInt(form.values['tanpa_isu_otoritas']) +
      parseInt(form.values['tanpa_isu_hilang_kerja']) +
      parseInt(form.values['optimis_terhadap_hasil']) +
      parseInt(form.values['nyaman_dengan_hasil']);
    return sum == 0 ? 0 : sum / 4;
  }

  function nilaiKesiapan() {
    const sum = kepemimpinan() + lingkungan() + komitmen() + resistensi();
    return sum; // == 0 ? 0.0 : sum / 4;
  }

  useEffect(() => {
    if (!data) return;
    form.setFieldValue('projectId', data.projectId);
    form.setFieldValue('sepakat_dengan_misi', data.sepakat_dengan_misi);
    form.setFieldValue('komunikasi_terbuka', data.komunikasi_terbuka);
    form.setFieldValue('percaya_bawahan', data.percaya_bawahan);
    form.setFieldValue('ide_bawahan', data.ide_bawahan);
    form.setFieldValue('interaksi_bersahabat', data.interaksi_bersahabat);
    form.setFieldValue('saling_percaya', data.saling_percaya);
    form.setFieldValue('kinerja_teamwork', data.kinerja_teamwork);
    form.setFieldValue('lingkungan_koperatif', data.lingkungan_koperatif);
    form.setFieldValue('saling_menghargai', data.saling_menghargai);
    form.setFieldValue('kompetensi_memadai', data.kompetensi_memadai);
    form.setFieldValue('ekspektasi_realistis', data.ekspektasi_realistis);
    form.setFieldValue('komunikasi_intens', data.komunikasi_intens);
    form.setFieldValue('tanpa_isu_otoritas', data.tanpa_isu_otoritas);
    form.setFieldValue('tanpa_isu_hilang_kerja', data.tanpa_isu_hilang_kerja);
    form.setFieldValue('optimis_terhadap_hasil', data.optimis_terhadap_hasil);
    form.setFieldValue('nyaman_dengan_hasil', data.nyaman_dengan_hasil);
    form.setFieldValue('total', data.total);
  }, [data]);

  useEffect(() => {
    if (!hasAllValues()) setFinal(false);
    form.setFieldValue('total', nilaiKesiapan());
  }, [form.values]);

  function postValues() {
    const copy = { ...form.values };
    delete copy.projectId;
    Object.keys(copy).forEach((key: string) => {
      copy[key] = parseInt(copy[key]);
    });
    return {
      projectId: data.projectId,
      data: copy,
      isFinal: final,
    };
  }

  function hasAllValues() {
    let rs = true;
    Object.keys(form.values).forEach((k) => {
      // @ts-ignore
      const val = form.values[k];
      if (val == 0 || val == '0') {
        rs = false;
        // setFinal(false);
      }
    });
    return rs;
  }

  const [submitting, setSubmitting] = useState(false);
  const [final, setFinal] = useState(project.tglKonfirmasi != null);

  async function saveAnalisis() {
    setSubmitting(true);
    try {
      await fetchJson('/api/auth/post?subject=save-analisis', createPostData(postValues()));
      mutateKesiapan();
      mutate(`/api/auth/get?subject=analisis&option=${project.id}`);
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  }

  return (
    <div>
      <BobotNilai nilai={form.values['total'] || 0} info="Berdasar hasil analisis 16 aspek." />
      <Paper withBorder sx={(theme) => ({ borderColor: theme.colors.gray[5], overflow: 'hidden' })}>
        <Table fontSize={13.5}>
          <tbody style={{ verticalAlign: 'middle' }}>
            <tr style={{ backgroundColor: '#fcfcfc' }}>
              <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                <Text my={3} size="sm" weight={600}>
                  Kepemimpinan
                </Text>
              </td>
            </tr>

            <SelectVal
              label="Membangun kesepakatan terhadap misi bersama"
              field={form.getInputProps('sepakat_dengan_misi')}
              canEdit={canEdit}
            />
            <SelectVal
              label="Membangun komunikasi terbuka"
              field={form.getInputProps('komunikasi_terbuka')}
              canEdit={canEdit}
            />
            <SelectVal
              label="Keyakinan &amp; kepercayaan pada bawahan"
              field={form.getInputProps('percaya_bawahan')}
              canEdit={canEdit}
            />
            <SelectVal
              label="Penggunaan ide bawahan secara konstruktif"
              field={form.getInputProps('ide_bawahan')}
              pb={10}
              canEdit={canEdit}
            />

            <tr style={{ backgroundColor: '#fcfcfc' }}>
              <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                <Text my={3} size="sm" weight={600}>
                  Lingkungan Kerja Kolaboratif
                </Text>
              </td>
            </tr>

            <SelectVal
              //
              label="Interaksi yang bersahabat"
              field={form.getInputProps('interaksi_bersahabat')}
              canEdit={canEdit}
            />
            <SelectVal
              // ssss
              label="Saling percaya"
              field={form.getInputProps('saling_percaya')}
              canEdit={canEdit}
            />
            <SelectVal
              //
              label="Kinerja teamwork"
              field={form.getInputProps('kinerja_teamwork')}
              canEdit={canEdit}
            />
            <SelectVal
              label="Lingkungan kerja yang kooperatif"
              field={form.getInputProps('lingkungan_koperatif')}
              canEdit={canEdit}
            />
            <SelectVal
              //
              label="Saling menghargai"
              field={form.getInputProps('saling_menghargai')}
              canEdit={canEdit}
              pb={10}
            />

            <tr style={{ backgroundColor: '#fcfcfc' }}>
              <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                <Text my={3} size="sm" weight={600}>
                  Komitmen Top Management
                </Text>
              </td>
            </tr>

            <SelectVal
              //
              label="Kompetensi yang memadai"
              field={form.getInputProps('kompetensi_memadai')}
              canEdit={canEdit}
            />
            <SelectVal
              // ssss
              label="Ekspektasi realistis terhadap hasil"
              field={form.getInputProps('ekspektasi_realistis')}
              canEdit={canEdit}
            />
            <SelectVal
              //
              label="Komunikasi yang intens"
              field={form.getInputProps('komunikasi_intens')}
              pb={10}
              canEdit={canEdit}
            />

            <tr style={{ backgroundColor: '#fcfcfc' }}>
              <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                <Text my={3} size="sm" weight={600}>
                  Resistensi Terhadap Perubahan
                </Text>
              </td>
            </tr>

            <SelectVal
              //
              label="Tidak ada isu kehilangan otoritas"
              field={form.getInputProps('tanpa_isu_otoritas')}
              canEdit={canEdit}
            />
            <SelectVal
              // ssss
              label="Tidak ada isu kehilangan perkerjaan"
              field={form.getInputProps('tanpa_isu_hilang_kerja')}
              canEdit={canEdit}
            />
            <SelectVal
              //
              label="Optimis terhadap hasil perubahan"
              field={form.getInputProps('optimis_terhadap_hasil')}
              canEdit={canEdit}
            />
            <SelectVal
              //
              label="Nyaman dengan tujuan/hasil perubahan"
              field={form.getInputProps('nyaman_dengan_hasil')}
              pb={10}
              canEdit={canEdit}
            />
          </tbody>
        </Table>
      </Paper>

      {/* <Pojo object={data} /> */}

      <p style={{ fontSize: 13 }}>
        Tgl Konfirmasi:{' '}
        {project.tglKonfirmasi ? project.tglKonfirmasi.substring(0, 10) : 'Belum ditetapkan'}
      </p>

      {canEdit && (
        <>
          <Checkbox
            mt={15}
            label="Simpan sebagai analisis final"
            disabled={!hasAllValues()}
            checked={final}
            onChange={(event) => setFinal(event.currentTarget.checked)}
          />
          <Button
            my={20}
            // disabled={project.tglKonfirmasi}
            onClick={() => saveAnalisis()}
            loading={submitting}
          >
            Save Analysis
          </Button>
        </>
      )}
    </div>
  );
}

function SelectVal({
  label,
  field,
  canEdit,
  pb,
}: {
  canEdit: boolean;
  label: string;
  field: any;
  pb?: number;
}) {
  const values = [
    { label: '', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];

  return (
    <tr>
      <td style={{ borderWidth: pb ? 1 : 0, paddingBottom: pb || 0, paddingLeft: 24 }}>{label}</td>
      <td width="30" style={{ borderWidth: pb ? 1 : 0, paddingBottom: pb || 0 }}>
        <NativeSelect
          {...field}
          sx={{ width: 32 }}
          styles={{ input: { fontSize: 14 } }}
          size="xs"
          data={values}
          rightSection={<></>}
          rightSectionWidth={0}
          disabled={!canEdit}
        />
      </td>
    </tr>
  );
}
