import { Button, NumberInput, Select, Text, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import ButtonXS from 'components/ButtonXS';
import Pojo from 'components/Pojo';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { useEffect, useState } from 'react';
import { KeyedMutator } from 'swr';

export default function FormProgress({
  rencanaId,
  progress,
  mutate,
  onCancel,
}: {
  rencanaId: string;
  progress: number;
  mutate: KeyedMutator<any>;
  onCancel: () => void;
}) {
  const form = useForm({
    initialValues: {
      rencanaId: rencanaId,
      type: 'kemajuan',
      progress: progress,
      laporan: '',
    },
    validate: {
      progress: (val) => (val >= progress ? null : 'ERRR'),
    },
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (progress) form.setFieldValue('progress', progress);
  }, [progress]);

  async function handleSubmit(values: typeof form.values) {
    setSubmitting(true);
    try {
      const url = `/api/auth/post?subject=save-progress`;
      await fetchJson(url, createPostData(values));
      form.reset();
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ marginTop: 20, padding: '7px 12px', border: '1px solid #9ab' }}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <div style={{ display: 'flex', alignItems: 'start', marginTop: 10 }}>
          <Text size="sm" pt={5} weight={500} style={{ width: 100, flexShrink: 0 }}>
            Tipe:
          </Text>
          <div style={{ flexGrow: 1 }}>
            <Select
              {...form.getInputProps('type')}
              data={[
                { value: 'kemajuan', label: 'Kemajuan' },
                { value: 'masalah', label: 'Masalah' },
              ]}
            />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'start', marginTop: 10 }}>
          <Text size="sm" pt={5} weight={500} style={{ width: 100, flexShrink: 0 }}>
            Laporan:
          </Text>
          <div style={{ flexGrow: 1 }}>
            <Textarea {...form.getInputProps('laporan')} placeholder="Minimum 16 karakter" />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'start', marginTop: 10 }}>
          <Text size="sm" pt={5} weight={500} style={{ width: 100, flexShrink: 0 }}>
            Progress:
          </Text>
          <div style={{ flexGrow: 1 }}>
            <NumberInput
              {...form.getInputProps('progress')}
              disabled={form.values['type'] == 'masalah'}
              min={progress}
              max={100}
              step={1}
              defaultValue={progress}
              value={form.values['progress']}
              onChange={(val) => {
                if (val && val < progress) {
                  form.setFieldValue('progress', progress);
                } else {
                  val && form.setFieldValue('progress', val);
                }
              }}
              formatter={(value) => (!Number.isNaN(parseInt(value as string)) ? `${value}%` : '')}
            />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'start', marginTop: 10 }}>
          <Text size="sm" pt={5} weight={500} style={{ width: 100, flexShrink: 0 }}></Text>
          <div style={{ flexGrow: 1 }}>
            <ButtonXS
              type="dark"
              submit
              sx={{ marginRight: 10 }}
              disabled={form.values['laporan'].length < 16}
              label="Save"
            />
            <ButtonXS type="red-outline" label="Cancel" onClick={onCancel} />
          </div>
        </div>
      </form>
    </div>
  );
}
