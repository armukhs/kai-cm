import { Button, Checkbox, NativeSelect, Paper, Table, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { useEffect, useState } from 'react';
import { KeyedMutator } from 'swr';

export default function FormAnalisis({
  data,
  canEdit,
  mutate,
}: {
  data: any;
  canEdit: boolean;
  mutate: KeyedMutator<any>;
}) {
  const form = useForm({
    initialValues: {
      projectId: data.projectId,
      sepakat_dengan_misi: data.kesiapan.sepakat_dengan_misi,
      komunikasi_terbuka: data.kesiapan.komunikasi_terbuka,
      percaya_bawahan: data.kesiapan.percaya_bawahan,
      ide_bawahan: data.kesiapan.ide_bawahan,
      interaksi_bersahabat: data.kesiapan.interaksi_bersahabat,
      saling_percaya: data.kesiapan.saling_percaya,
      kinerja_teamwork: data.kesiapan.kinerja_teamwork,
      lingkungan_koperatif: data.kesiapan.lingkungan_koperatif,
      saling_menghargai: data.kesiapan.saling_menghargai,
      kompetensi_memadai: data.kesiapan.kompetensi_memadai,
      ekspektasi_realistis: data.kesiapan.ekspektasi_realistis,
      komunikasi_intens: data.kesiapan.komunikasi_intens,
      tanpa_isu_otoritas: data.kesiapan.tanpa_isu_otoritas,
      tanpa_isu_hilang_kerja: data.kesiapan.tanpa_isu_hilang_kerja,
      optimis_terhadap_hasil: data.kesiapan.optimis_terhadap_hasil,
      nyaman_dengan_hasil: data.kesiapan.nyaman_dengan_hasil,
      // tglKonfirmasi: data.tglKonfirmasi,
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldValue('sepakat_dengan_misi', data.kesiapan.sepakat_dengan_misi);
      form.setFieldValue('komunikasi_terbuka', data.kesiapan.komunikasi_terbuka);
      form.setFieldValue('percaya_bawahan', data.kesiapan.percaya_bawahan);
      form.setFieldValue('ide_bawahan', data.kesiapan.ide_bawahan);
      form.setFieldValue('interaksi_bersahabat', data.kesiapan.interaksi_bersahabat);
      form.setFieldValue('saling_percaya', data.kesiapan.saling_percaya);
      form.setFieldValue('kinerja_teamwork', data.kesiapan.kinerja_teamwork);
      form.setFieldValue('lingkungan_koperatif', data.kesiapan.lingkungan_koperatif);
      form.setFieldValue('saling_menghargai', data.kesiapan.saling_menghargai);
      form.setFieldValue('kompetensi_memadai', data.kesiapan.kompetensi_memadai);
      form.setFieldValue('ekspektasi_realistis', data.kesiapan.ekspektasi_realistis);
      form.setFieldValue('komunikasi_intens', data.kesiapan.komunikasi_intens);
      form.setFieldValue('tanpa_isu_otoritas', data.kesiapan.tanpa_isu_otoritas);
      form.setFieldValue('tanpa_isu_hilang_kerja', data.kesiapan.tanpa_isu_hilang_kerja);
      form.setFieldValue('optimis_terhadap_hasil', data.kesiapan.optimis_terhadap_hasil);
      form.setFieldValue('nyaman_dengan_hasil', data.kesiapan.nyaman_dengan_hasil);
      // form.setFieldValue('tglKonfirmasi', data.tglKonfirmasi);
      setFinal(data.tglKonfirmasi != null);
    }
  }, [data]);

  useEffect(() => {
    if (!hasAllValues()) setFinal(false);
  }, [form.values]);

  function postValues() {
    const original = {};
    Object.keys(form.values).forEach((key: string) => {
      if (key != 'projectId' && key != 'tglKonfirmasi') {
        // @ts-ignore
        original[key] = parseInt(form.values[key]);
      }
    });
    return {
      projectId: data.id,
      data: original,
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
  const [final, setFinal] = useState(data.tglKonfirmasi != null);

  async function saveAnalisis() {
    setSubmitting(true);
    try {
      await fetchJson('/api/auth/post?subject=save-analisis', createPostData(postValues()));
      mutate();
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  }

  return (
    <div>
      <Text size="sm" mb={15} color="gray">
        Berdasar hasil analisis 16 aspek.
      </Text>

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

      <p style={{ fontSize: 13 }}>
        Tgl Konfirmasi:{' '}
        {data.tglKonfirmasi ? data.tglKonfirmasi.substring(0, 10) : 'Belum ditetapkan'}
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
          <Button my={20} onClick={() => saveAnalisis()} loading={submitting}>
            Save Analysis
          </Button>
        </>
      )}

      {/* <Pojo obj={form.values['ekspektasi_realistis']} /> */}
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
