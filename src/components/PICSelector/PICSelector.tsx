import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Paper, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import TopUnitSelect from 'components/TopUnitSelect/TopUnitSelect';

export default function PICSelector({
  dataUnit,
  dataInduk,
  dataJabatan,
  selected,
  callback,
}: {
  dataUnit: any[];
  dataInduk: any[];
  dataJabatan: any[];
  selected: any;
  callback: Dispatch<SetStateAction<string>>;
}) {
  const [init, setInit] = useState(false);
  const [kodePrev, setKodePrev] = useState(''); // dataInduk[0].kode
  const [kodeInduk, setKodeInduk] = useState(''); // dataInduk[0].kode
  const form = useForm({
    initialValues: {
      unit: selected ? selected.unitid : '',
      jabatan: selected ? selected.id : '',
    },
  });

  useEffect(() => {
    if (selected) {
      setInit(false);
      dataInduk.forEach((u) => {
        if (selected.kode && selected.kode.startsWith(u.kode)) {
          setKodePrev(u.kode);
          setKodeInduk(u.kode);
          form.setFieldValue('unit', selected.unitid);
          form.setFieldValue('jabatan', selected.id);
        }
      });
      // setInit(true);
    } else {
      const kode = dataInduk ? dataInduk[0]?.kode : '';
      setKodePrev(kode);
      setKodeInduk(kode);
      form.setFieldValue('unit', '');
      form.setFieldValue('jabatan', '');
      setInit(true);
    }
    // setInit(true);
    return () => {};
  }, [selected]);

  useEffect(() => {
    if (init && kodeInduk != kodePrev) {
      form.setFieldValue('unit', '');
      form.setFieldValue('jabatan', '');
      setKodePrev(kodeInduk);
    }
    return () => {};
  }, [kodeInduk]);

  useEffect(() => {
    if (init) {
      form.setFieldValue('jabatan', '');
    }

    return () => {};
  }, [form.values['unit']]);

  useEffect(() => {
    if (init) {
      callback(form.values['jabatan']);
    }

    return () => {};
  }, [form.values['jabatan']]);

  return (
    <Paper withBorder sx={{ borderColor: '#d4d4d4' }}>
      <div style={{ padding: 7, borderBottom: '1px solid #d4d4d4' }}>
        <TopUnitSelect
          parents={dataInduk}
          selected={kodeInduk}
          callback={setKodeInduk}
          effect={() => setInit(true)}
        />
      </div>
      <div style={{ padding: 7, borderBottom: '1px solid #d4d4d4' }}>
        <div style={{ fontSize: 13 }}>Pilih Unit Organisasi</div>
        <Select
          {...form.getInputProps('unit')}
          data={dataUnit ? dataUnit.filter((u) => u.kode.startsWith(kodeInduk)) : []}
          onFocus={() => setInit(true)}
        />
      </div>
      <div style={{ padding: 7, borderBottom: '1px solid #d4d4d4' }}>
        <div style={{ fontSize: 13 }}>Pilih Jabatan</div>
        <Select
          {...form.getInputProps('jabatan')}
          data={dataJabatan ? dataJabatan.filter((j) => j.unitid == form.values['unit']) : []}
        />
      </div>
    </Paper>
  );
}
