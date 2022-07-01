import {
  Box,
  Checkbox,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import ButtonXS from 'components/ButtonXS';
import Datum from 'components/Datum/Datum';
import OrganizationContext from 'components/OrganizationProvider/OrganizationProvider';
import PICSelector from 'components/PICSelector/PICSelector';
import Pojo from 'components/Pojo';
import TopUnitSelect from 'components/TopUnitSelect/TopUnitSelect';
import UnitOrJabatan from 'components/UnitOrJabatan/UnitOrJabatan';
import fetchJson from 'lib/fetchJson';
import useAuthApi from 'lib/useAuthApi';
import { createPostData } from 'lib/utils';
import { useContext, useEffect, useState, useRef, Dispatch } from 'react';

export default function FormRencana({
  title,
  data,
  pic,
  setActiveTab,
  onSuccess,
  onCancel,
}: {
  title: string;
  data: any;
  pic: any;
  setActiveTab?: Dispatch<number>;
  onSuccess?: () => void;
  onCancel: () => void;
}) {
  const { mutate } = useAuthApi('rencana', data.type, data.projectId);

  const { units, parents, jabatans } = useContext(OrganizationContext);
  const form = useForm({
    initialValues: {
      id: '',
      projectId: '',
      picId: '',
      type: '',
      rencana: '',
      audien: '',
      waktu: '',
      tempat: '',
      tolokUkur: '',
      monitoring: '',
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const [init, setInit] = useState(false);
  const [kodeInduk, setKodeInduk] = useState(parents[0].kode);
  const [daftarIDTerdampak, setDaftarIDTerdampak] = useState<string[]>([]);
  const [daftarUnitTerdampak, setDaftarUnitTerdampak] = useState<any[]>([]);
  const [picId, setPicId] = useState('');

  useEffect(() => {
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

    return () => {};
  }, [daftarIDTerdampak, setDaftarUnitTerdampak, setKodeInduk, init, setInit]);

  useEffect(() => {
    form.setFieldValue('picId', picId);

    return () => {};
  }, [picId]);

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
      form.setFieldValue('rencana', data.rencana);
      form.setFieldValue('audien', data.audien);
      form.setFieldValue('waktu', data.waktu);
      form.setFieldValue('tempat', data.tempat);
      form.setFieldValue('tolokUkur', data.tolokUkur);
      form.setFieldValue('monitoring', data.monitoring);

      if (data.UnitRencana.length > 0) {
        const ids: string[] = [];
        data.UnitRencana.forEach((d: any) => ids.push(d.unitId));
        setDaftarIDTerdampak(ids);
      }
    }

    return () => {};
  }, [data]);

  function cleanUp(param: string) {
    const lines = param.split('\n');
    let items: string[] = [];
    lines.forEach((l) => {
      if (l.length > 0) items.push(l);
    });

    if (items.length > 0) return items.join('\n');
    return '';
  }

  async function handleSubmit() {
    setSubmitting(true);
    const body = { ...form.values, unitTerdampak: [''] };
    body.tolokUkur = cleanUp(form.values['tolokUkur']);
    body.unitTerdampak = daftarIDTerdampak;
    console.log('BODY', body);

    try {
      const url = '/api/auth/post?subject=save-rencana';
      const rs: any = await fetchJson(url, createPostData(body));
      mutate();
      if (onSuccess) {
        onSuccess();
        if (setActiveTab) setActiveTab(rs?.rencanas.length - 1);
      } else {
        if (rs.rencanas.length == 1) {
          setTimeout(() => {}, 200);
        }
        onCancel();
      }

      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  }

  const viewport = useRef<HTMLDivElement>();
  const scrollToTop = () => viewport.current?.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Paper
      withBorder
      sx={(theme) => ({
        position: 'relative',
        borderColor: theme.colors.gray[5],
        overflow: 'hidden',
      })}
    >
      {/* <Pojo object={pic} /> */}
      {/* <Pojo object={form.values} /> */}
      <LoadingOverlay visible={submitting} />
      <Text p={14} weight={600}>
        {title}
      </Text>
      <Datum
        borderTop
        borderBottom
        label="Kegiatan"
        value={
          <Textarea
            {...form.getInputProps('rencana')}
            autosize
            minRows={3}
            mb={0}
            required
            onKeyDown={(e) => {
              if (e.code == 'Enter') {
                e.preventDefault();
              }
            }}
          />
        }
      />
      <Datum
        borderBottom
        label="Audien"
        value={<TextInput {...form.getInputProps('audien')} required />}
      />
      <Datum
        borderBottom
        label="Waktu"
        value={<TextInput {...form.getInputProps('waktu')} required />}
      />
      <Datum
        borderBottom
        label="Tolok Ukur"
        value={
          <Textarea
            {...form.getInputProps('tolokUkur')}
            autosize
            minRows={3}
            mb={0}
            required
            onKeyDown={(e) => {
              if (e.code == 'Enter') {
                e.preventDefault();
              }
            }}
          />
        }
      />
      <Datum
        borderBottom
        label="Monitoring"
        value={<TextInput {...form.getInputProps('monitoring')} required />}
      />

      <Box
        sx={(theme) => ({
          padding: `7px 10px 7px 14px`,
          // borderTop: `1px solid ${theme.colors.gray[4]}`,
        })}
      >
        <Text
          sx={(theme) => ({
            fontSize: 13,
            fontWeight: 400,
            marginBottom: 4,
            color: theme.colors.gray[7],
          })}
        >
          Unit Tedampak:
        </Text>
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
          <div style={{ padding: 7, borderBottom: '1px solid #d4d4d4' }}>
            <TopUnitSelect
              parents={parents}
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

      <Box
        sx={(theme) => ({
          padding: `7px 10px 7px 14px`,
          borderTop: `1px solid ${theme.colors.gray[4]}`,
        })}
      >
        <Text
          sx={(theme) => ({
            fontSize: 13,
            fontWeight: 400,
            marginBottom: 4,
            color: theme.colors.gray[7],
          })}
        >
          PIC Perubahan: {form.values['picId']} - {picId ? picId : 'NOE'}
        </Text>
        <PICSelector
          dataInduk={parents}
          dataUnit={units}
          dataJabatan={jabatans}
          selected={pic}
          callback={setPicId}
        />
      </Box>

      <Datum
        borderTop
        borderBottom
        value={
          <Box py={5}>
            <ButtonXS
              type="dark"
              label="Save Rencana"
              sx={{ marginRight: 10 }}
              onClick={() => handleSubmit()}
            />
            <ButtonXS type="red" label="Cancel" sx={{}} onClick={onCancel} />
          </Box>
        }
      />
    </Paper>
  );
}
