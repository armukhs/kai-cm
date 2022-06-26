import { Button, LoadingOverlay, Textarea, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import Show from 'components/Show';
import fetchJson from 'lib/fetchJson';
import { SessionUser } from 'lib/session';
import { createPostData } from 'lib/utils';
import { useRouter } from 'next/router';
import { Dispatch, useEffect, useState } from 'react';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  label: {
    fontSize: 13,
  },
}));

export default function FormProject({
  user,
  data = null,
  onCancel,
  callback,
}: {
  user: SessionUser;
  data?: any;
  onCancel: () => void;
  callback: Dispatch<any>;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      id: null,
      unitId: user?.unitId,
      managerId: user?.id,
      judul: '',
      deskripsi: '',
      tujuan: '',
      target: '',
      tglMulai: '',
      tglSelesai: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldValue('id', data.id);
      form.setFieldValue('unitId', data.unitId);
      form.setFieldValue('managerId', data.managerId);
      form.setFieldValue('judul', data.judul);
      form.setFieldValue('deskripsi', data.deskripsi);
      form.setFieldValue('tujuan', data.tujuan);
      form.setFieldValue('target', data.target);
      // @ts-ignore
      form.setFieldValue('tglMulai', data.tglMulai ? new Date(data.tglMulai) : '');
      // @ts-ignore
      form.setFieldValue('tglSelesai', data.tglSelesai ? new Date(data.tglSelesai) : '');
    }
    return () => {};
  }, []);

  async function handleSubmit(values: typeof form.values) {
    setSubmitting(true);
    try {
      const url = data
        ? '/api/auth/post?subject=save-project'
        : '/api/auth/post?subject=register-project';
      const rs: any = await fetchJson(url, createPostData(values));
      if (data) {
        callback(rs);
        onCancel();
      } else router.push(`/project/${rs?.id}`);
    } catch (error) {}
    setSubmitting(false);
  }

  return (
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={submitting} />
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          {...form.getInputProps('judul')}
          label="Judul Proyek"
          placeholder="Judul Proyek"
          classNames={classes}
          required
          autoFocus
          mb={7}
        />
        <Textarea
          {...form.getInputProps('deskripsi')}
          label="Deskripsi"
          placeholder="Deskripsi singkat"
          classNames={classes}
          required
          mb={7}
          onKeyDown={(e) => {
            if (e.code == 'Enter') e.preventDefault();
          }}
        />
        <Textarea
          {...form.getInputProps('tujuan')}
          label="Tujuan"
          placeholder="Tujuan"
          classNames={classes}
          required
          mb={7}
          onKeyDown={(e) => {
            if (e.code == 'Enter') e.preventDefault();
          }}
        />
        <Textarea
          {...form.getInputProps('target')}
          label="Target"
          classNames={classes}
          placeholder="Target"
          required
          mb={7}
          onKeyDown={(e) => {
            if (e.code == 'Enter') e.preventDefault();
          }}
        />
        <DatePicker
          value={form.values['tglMulai'] ? new Date(form.values['tglMulai']) : null}
          onChange={(e) => {
            form.setFieldValue(
              'tglMulai',
              e ? e.toLocaleDateString().split('/').reverse().join('-') : ''
            );
          }}
          label="Tanggal Mulai"
          classNames={classes}
          inputFormat="DD MMMM YYYY"
          required
          mb={7}
        />
        <DatePicker
          // {...form.getInputProps('tglSelesai')}
          value={form.values['tglSelesai'] ? new Date(form.values['tglSelesai']) : null}
          onChange={(e) => {
            form.setFieldValue(
              'tglSelesai',
              e ? e.toLocaleDateString().split('/').reverse().join('-') : ''
            );
          }}
          label="Tanggal Selesai"
          // locale="id"
          classNames={classes}
          inputFormat="DD MMMM YYYY"
          required
          mb={7}
        />
        <Button mt={15} type="submit">
          {data ? 'Save Project' : 'Register Project'}
        </Button>
        <Show when={onCancel !== undefined} display="inline-block">
          <Button mt={15} ml={10} variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </Show>
      </form>
    </div>
  );
}
