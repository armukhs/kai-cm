import {
  Box,
  Button,
  Checkbox,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Text,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import PICSelector from 'components/PICSelector/PICSelector';
import Pojo from 'components/Pojo';
import TopUnitSelect from 'components/TopUnitSelect/TopUnitSelect';
import UnitOrJabatan from 'components/UnitOrJabatan/UnitOrJabatan';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { useStyles } from './FormPerubahan.styles';

export default function FormPerubahan({
  data,
  units,
  topUnits,
  pic,
  dataJabatan,
  mutate,
  onSuccess,
  onCancel,
}: {
  data: any;
  units: any[];
  topUnits: any[];
  pic: any;
  dataJabatan: any[];
  mutate: Dispatch<any>;
  onSuccess: Dispatch<any>;
  onCancel: () => void;
}) {
  const { classes } = useStyles();
  const [submitting, setSubmitting] = useState(false);
  const [init, setInit] = useState(false);
  const [kodeInduk, setKodeInduk] = useState(topUnits ? topUnits[0]?.kode : '');
  const [daftarIDTerdampak, setDaftarIDTerdampak] = useState<string[]>([]);
  const [daftarUnitTerdampak, setDaftarUnitTerdampak] = useState<any[]>([]);
  const [picId, setPicId] = useState('');

  const form = useForm({
    initialValues: {
      id: '',
      picId: '',
      projectId: '',
      type: '',
      kondisi: '',
      perubahan: '',
    },
  });

  useEffect(() => {
    form.setFieldValue('picId', picId);

    return () => {};
  }, [picId]);

  useEffect(() => {
    if (units) {
      const daftar = units.filter((unit) => daftarIDTerdampak.includes(unit.id));
      setDaftarUnitTerdampak(daftar);
      const kodes: string[] = [];
      daftar.forEach((d) => kodes.push(d.kode));
      if (kodes.length > 0) {
        kodes.sort();
        if (!init) {
          setKodeInduk(kodes[0].charAt(0));
          setInit(!init);
        }
      }
    }

    return () => {};
  }, [daftarIDTerdampak, setDaftarUnitTerdampak]);

  useEffect(() => {
    if (data?.projectId) {
      form.setFieldValue('type', data.type);
      form.setFieldValue('projectId', data.projectId);
    }
    if (data?.id) {
      form.setFieldValue('id', data.id);
      form.setFieldValue('picId', data.picId || '');
      form.setFieldValue('projectId', data.projectId);
      form.setFieldValue('type', data.type);
      form.setFieldValue('kondisi', data.kondisi);
      form.setFieldValue('perubahan', data.perubahan);

      if (data.UnitPerubahan.length > 0) {
        const ids: string[] = [];
        data.UnitPerubahan.forEach((d: any) => ids.push(d.unitId));
        setDaftarIDTerdampak(ids);
      }
    }

    return () => {};
  }, [data]);

  function reset() {
    setDaftarIDTerdampak([]);
    setDaftarUnitTerdampak([]);
    setKodeInduk(topUnits[0].kode);
    form.setFieldValue('id', '');
    form.setFieldValue('kondisi', '');
    form.setFieldValue('perubahan', '');
  }

  async function handleSubmit(values: typeof form.values) {
    setSubmitting(true);
    const body = { ...values, unitTerdampak: [''] };
    body.unitTerdampak = daftarIDTerdampak;
    console.log(body);

    try {
      const url = '/api/auth/post?subject=save-perubahan';
      const rs: any = await fetchJson(url, createPostData(body));
      if (rs) {
        mutate(rs?.perubahans);
        if (!form.values['id']) onSuccess(rs?.perubahans.length - 1);
      }
      onCancel();
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  }

  const viewport = useRef<HTMLDivElement>();
  const scrollToTop = () => viewport.current?.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={submitting} />
      {/* <Pojo object={daftarIDTerdampak} /> */}
      {/* <Pojo object={data} /> */}
      {/* <Pojo object={form.values} /> */}
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        {data && (data.type == 'proses' || data.type == 'teknologi') && (
          <Box mb={10}>
            <Text className={classes.label}>Kondisi Sekarang</Text>
            <Textarea
              {...form.getInputProps('kondisi')}
              autosize
              minRows={3}
              required
              onKeyDown={(e) => {
                if (e.code == 'Enter') {
                  e.preventDefault();
                }
              }}
            />
          </Box>
        )}

        <Box mb={10}>
          <Text className={classes.label}>Bentuk Perubahan</Text>
          <Textarea
            {...form.getInputProps('perubahan')}
            autosize
            minRows={3}
            required
            onKeyDown={(e) => {
              if (e.code == 'Enter') {
                e.preventDefault();
              }
            }}
          />
        </Box>

        <Box mb={10}>
          <Text className={classes.label}>Unit Tedampak</Text>
          <Paper withBorder sx={{ borderColor: '#d4d4d4' }}>
            <ScrollArea
              style={{
                padding: 7,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 0,
                height: 100,
                borderBottom: '1px solid #d4d4d4',
              }}
            >
              {daftarUnitTerdampak.map((unit) => (
                <UnitOrJabatan key={unit.kode} uoj={unit} />
              ))}
            </ScrollArea>
            <div className={classes.topUnitsWrap}>
              <TopUnitSelect
                parents={topUnits}
                selected={kodeInduk}
                callback={setKodeInduk}
                effect={scrollToTop}
              />
            </div>

            <ScrollArea
              className={classes.scrollArea}
              // @ts-ignore
              viewportRef={viewport}
            >
              {units &&
                units
                  .filter((unit) => unit.kode.startsWith(kodeInduk))
                  .map((unit) => (
                    <Checkbox
                      key={unit.kode}
                      value={unit.id}
                      label={unit.nama}
                      width="100%"
                      size="sm"
                      py={2}
                      checked={daftarIDTerdampak.includes(unit.id)}
                      onChange={(e) => {
                        if (e.currentTarget.checked) {
                          setDaftarIDTerdampak([...daftarIDTerdampak, unit.id]);
                        } else {
                          setDaftarIDTerdampak(daftarIDTerdampak.filter((id) => id != unit.id));
                        }
                      }}
                    />
                  ))}
            </ScrollArea>
          </Paper>
        </Box>

        <Box my={20}>
          <Text className={classes.label}>PIC Perubahan</Text>
          <Text sx={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: 'gray' }}>
            {pic ? pic.label : 'Pilih PIC'}
          </Text>
          <PICSelector
            dataInduk={topUnits}
            dataUnit={units}
            dataJabatan={dataJabatan}
            selected={pic}
            callback={setPicId}
          />
        </Box>

        <Box mt={20}>
          <Button type="submit" radius={0} color="indigo">
            Save Perubahan
          </Button>
          <Button
            ml={10}
            variant="outline"
            radius={0}
            color="red"
            onClick={() => {
              reset();
              onCancel();
              window.scrollTo(0, 0);
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  );
}
