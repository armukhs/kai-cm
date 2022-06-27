import {
  Box,
  Button,
  Checkbox,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import PICSelector from 'components/PICSelector/PICSelector';
import TopUnitSelect from 'components/TopUnitSelect/TopUnitSelect';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { Dispatch, useEffect, useRef, useState } from 'react';

export default function FormRencana({
  data,
  units,
  topUnits,
  pic,
  dataJabatan,
  mutate,
  onCancel,
  onSuccess,
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
  const [submitting, setSubmitting] = useState(false);
  const [kodeInduk, setKodeInduk] = useState(topUnits ? topUnits[0]?.kode : '');
  const [daftarIDTerdampak, setDaftarIDTerdampak] = useState<string[]>([]);
  const [daftarUnitTerdampak, setDaftarUnitTerdampak] = useState<any[]>([]);

  const [picId, setPicId] = useState('');

  const form = useForm({
    initialValues: { ...data },
  });

  useEffect(() => {
    form.setFieldValue('picId', picId);

    return () => {};
  }, [picId]);

  useEffect(() => {
    if (units) {
      setDaftarUnitTerdampak(units.filter((unit) => daftarIDTerdampak.includes(unit.id)));
    }

    return () => {};
  }, [daftarIDTerdampak, setDaftarUnitTerdampak]);

  function cleanUp(param: string) {
    const lines = param.split('\n');
    let items: string[] = [];
    lines.forEach((l) => {
      if (l.length > 0) items.push(l);
    });

    if (items.length > 0) return items.join('\n');
    return '';
  }

  async function handleSubmit(values: typeof form.values) {
    setSubmitting(true);
    const body = { ...values, unitTerdampak: [''] };
    body.tolokUkur = cleanUp(values['tolokUkur']);
    body.unitTerdampak = daftarIDTerdampak;
    console.log(body);

    try {
      const url = '/api/auth/post?subject=save-rencana';
      const rs: any = await fetchJson(url, createPostData(body));
      if (rs) {
        mutate(rs?.rencanas);
        onSuccess(rs?.rencanas.length - 1);
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
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Textarea
          {...form.getInputProps('rencana')}
          autosize
          label="Rencana Kegiatan"
          minRows={3}
          mb={10}
          required
          onKeyDown={(e) => {
            if (e.code == 'Enter') {
              e.preventDefault();
            }
          }}
        />

        <Textarea
          {...form.getInputProps('audien')}
          autosize
          label="Audien"
          minRows={2}
          mb={10}
          required
          onKeyDown={(e) => {
            if (e.code == 'Enter') {
              e.preventDefault();
            }
          }}
        />

        <TextInput {...form.getInputProps('waktu')} label="Waktu" mb={10} required />
        <TextInput {...form.getInputProps('tempat')} label="Tempat" mb={10} required />

        <Textarea
          {...form.getInputProps('tolokUkur')}
          autosize
          label="Tolok Ukur"
          minRows={3}
          mb={10}
          required
        />

        <TextInput {...form.getInputProps('monitoring')} label="Monitoring" mb={10} required />

        <Box mb={10}>
          <Text sx={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Unit Tedampak</Text>

          <Paper withBorder sx={{ borderColor: '#d4d4d4' }}>
            <div
              style={{
                padding: 7,
                paddingLeft: 10,
                minHeight: 65,
                borderBottom: '1px solid #d4d4d4',
                fontSize: 14,
              }}
            >
              {daftarUnitTerdampak.map((unit) => (
                <UnitTerdampak key={unit.kode} unit={unit} />
              ))}
            </div>
            <div style={{ padding: 7, borderBottom: '1px solid #d4d4d4' }}>
              <TopUnitSelect
                parents={topUnits}
                selected={kodeInduk}
                callback={setKodeInduk}
                effect={scrollToTop}
              />
            </div>

            <ScrollArea
              style={{
                height: 168,
                paddingTop: 7,
                paddingLeft: 10,
              }}
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
          <Text sx={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>PIC Perubahan</Text>
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
            Save Rencana
          </Button>
          <Button
            ml={10}
            variant="outline"
            radius={0}
            color="red"
            onClick={() => {
              // reset();
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

function UnitTerdampak({ unit }: { unit: { kode: string; nama: string } }) {
  return (
    <div style={{ fontSize: 13 }}>
      {unit.kode} - {unit.nama}
    </div>
  );
}
