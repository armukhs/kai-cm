import { Box, LoadingOverlay, Paper, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import ButtonXS from 'components/ButtonXS';
import Datum from 'components/Datum/Datum';
import SessionContext from 'components/SessionProvider/SessionProvider';
import fetchJson from 'lib/fetchJson';
import { SessionUser } from 'lib/session';
import { createPostData } from 'lib/utils';
import { useContext, useState } from 'react';

export default function FormProfile({ user }: { user: SessionUser }) {
  const { setSessionUser } = useContext(SessionContext);
  const form = useForm({
    initialValues: {
      id: user.id,
      nama: user.nama,
    },
    validate: {
      nama: (value) => (value?.length > 5 ? null : 'Minimum 5 karakter'),
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [updated, setUpdated] = useState(false);

  async function handleSubmit(values: typeof form.values) {
    setSubmitting(true);
    try {
      const rs: SessionUser = await fetchJson(
        '/api/auth/post?subject=update-profile',
        createPostData(values)
      );
      setSessionUser(rs as SessionUser);
      // setNama(rs?.nama as string);
    } catch (error) {}
    setSubmitting(false);
  }

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
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Datum
          borderBottom
          center
          label="Nama Lengkap"
          value={<TextInput {...form.getInputProps('nama')} required />}
        />
        <Datum
          borderBottom
          center
          label="Unit"
          value={<TextInput disabled value={`${user?.kodeUnit} - ${user?.unit}`} />}
        />
        <Datum
          borderBottom
          center
          label="Jabatan"
          value={<TextInput disabled value={`${user?.kodeJabatan} - ${user?.jabatan}`} />}
        />

        <Datum borderBottom center label="NIPP" value={<TextInput disabled value={user.nipp} />} />
        <Datum
          borderBottom
          center
          label="Email"
          value={<TextInput disabled value={user.email} />}
        />

        <Datum
          borderTop
          borderBottom
          value={
            <Box py={5}>
              <ButtonXS
                type="dark"
                submit
                disabled={form.values['nama'].trim() == user.nama}
                label="Update"
                sx={{ marginRight: 10 }}
                onClick={() => {}}
              />
            </Box>
          }
        />
      </form>
    </Paper>
  );
}
