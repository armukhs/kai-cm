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
import { Dispatch, useContext, useEffect, useRef, useState } from 'react';
import { useStyles } from './FormPerubahan.styles';

export default function FormPerubahan({
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
  const { mutate } = useAuthApi('perubahan', data.type, data.projectId);
  const { units, parents, jabatans } = useContext(OrganizationContext);

  const { classes } = useStyles();
  const [submitting, setSubmitting] = useState(false);
  const [init, setInit] = useState(false);
  const [kodeInduk, setKodeInduk] = useState(parents[0].kode);
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

  // function reset() {
  //   setDaftarIDTerdampak([]);
  //   setDaftarUnitTerdampak([]);
  //   setKodeInduk(topUnits[0].kode);
  //   form.setFieldValue('id', '');
  //   form.setFieldValue('kondisi', '');
  //   form.setFieldValue('perubahan', '');
  // }

  async function handleSubmit() {
    setSubmitting(true);
    const body = { ...form.values, unitTerdampak: [''] };
    body.unitTerdampak = daftarIDTerdampak;
    console.log(body);

    try {
      const url = '/api/auth/post?subject=save-perubahan';
      const rs: any = await fetchJson(url, createPostData(body));
      mutate();
      if (onSuccess) {
        onSuccess();
        if (setActiveTab) setActiveTab(rs?.perubahans.length - 1);
      } else {
        if (rs.perubahans.length == 1) {
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
      <LoadingOverlay visible={submitting} />

      <Text p={14} weight={600}>
        {title}
      </Text>

      {(data.type == 'proses' || data.type == 'teknologi') && (
        <>
          <Datum
            borderTop
            borderBottom
            label="Kondisi Sekarang"
            value={
              <Textarea
                {...form.getInputProps('kondisi')}
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
            borderTop={false}
            borderBottom
            label="Bentuk Perubahan"
            value={
              <Textarea
                {...form.getInputProps('perubahan')}
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
        </>
      )}

      {data.type != 'proses' && data.type != 'teknologi' && (
        <Datum
          borderTop
          borderBottom
          label="Bentuk Perubahan"
          value={
            <Textarea
              {...form.getInputProps('perubahan')}
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
      )}

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
