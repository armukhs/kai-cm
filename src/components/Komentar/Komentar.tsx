import { useContext, useState } from 'react';
import { useForm } from '@mantine/form';
import { Box, Button, Divider, LoadingOverlay, Textarea, Title } from '@mantine/core';
import useAuthApi from 'lib/useAuthApi';
import SessionContext from 'components/SessionProvider/SessionProvider';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import Block from 'components/Block';
import Pojo from 'components/Pojo';

export default function Komentar({
  type,
  targetId,
  projectId,
}: {
  type: string;
  targetId: string;
  projectId: string;
}) {
  const { sessionUser: user } = useContext(SessionContext);
  const { data, error, mutate } = useAuthApi('komentar', type, targetId);

  const [submitting, setSubmitting] = useState(false);
  const form = useForm({
    initialValues: {
      userId: user.id,
      projectId: projectId,
      targetId: targetId,
      type: type,
      value: '',
    },
  });

  function tanggal(d: string) {
    const tgl = new Date(d);
    return tgl.toLocaleDateString();
  }

  function parseKomentar(param: string) {
    const lines = param.split('\n');
    if (lines.length > 0) {
      return (
        <div>
          {lines.map((line, index) => (
            <div key={index} style={{ fontSize: 12.3, marginTop: index == 0 ? 0 : 6 }}>
              {line}
            </div>
          ))}
        </div>
      );
    }

    return <></>;
  }

  async function handleSubmit(values: typeof form.values) {
    setSubmitting(true);
    try {
      await fetchJson('/api/auth/post?subject=save-komentar', createPostData(values));
      mutate();
      form.setFieldValue('value', '');
    } catch (error) {}
    setSubmitting(false);
  }

  if (!data) return <></>;

  return (
    <Box my={40}>
      {/* <Pojo object={form.values} /> */}
      {/* <Block show={data.length == 0}>
        <div>Kosong</div>
      </Block> */}
      <Block show={data}>
        <p
          style={{
            marginBottom: 15,
            fontWeight: 500,
            color: '#567',
            paddingBottom: 4,
            borderBottom: '1px solid #abc',
          }}
        >
          Komentar dan Saran
        </p>
        {data.map((komentar: any) => (
          <Box key={komentar.id} style={{ fontSize: 12.3, marginBottom: 20 }}>
            <p style={{ marginBottom: 0, fontWeight: 600, color: '#b34' }}>
              {komentar.User.nama} ({tanggal(komentar.created)}):
            </p>
            {parseKomentar(komentar.value)}
          </Box>
        ))}
      </Block>

      <Divider my={20} variant="dashed" />

      <p
        style={{
          marginBottom: 0,
          fontWeight: 500,
          fontSize: 13,
          color: '#567',
          paddingBottom: 4,
        }}
      >
        Komentar Anda
      </p>
      <div style={{ position: 'relative', marginTop: 0 }}>
        <LoadingOverlay visible={submitting} />
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Textarea {...form.getInputProps('value')} minRows={3} required />
          <Button type="submit" size="xs" variant="outline" radius={0} color="dark" mt={10}>
            Submit
          </Button>
        </form>
      </div>
    </Box>
  );
}
