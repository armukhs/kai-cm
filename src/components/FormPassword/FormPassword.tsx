import { Alert, Box, LoadingOverlay, Paper, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import ButtonXS from 'components/ButtonXS';
import Datum from 'components/Datum/Datum';
import fetchJson from 'lib/fetchJson';
import { SessionUser } from 'lib/session';
import { createPostData } from 'lib/utils';
import { useState } from 'react';

export default function FormPassword({ user }: { user: SessionUser }) {
  const form = useForm({
    initialValues: {
      id: user?.id,
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) => (value?.length > 5 ? null : 'Minimum 6 karakter'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [updated, setUpdated] = useState(false);

  async function handleSubmit(values: typeof form.values) {
    setSubmitting(true);
    try {
      const rs: SessionUser = await fetchJson(
        '/api/auth/post?subject=update-password',
        createPostData(values)
      );
      // form.setFieldValue('password', '');
      // form.setFieldValue('confirmPassword', '');
      setUpdated(true);
    } catch (error) {}
    setSubmitting(false);
  }

  if (updated) {
    return (
      <Alert mt={16} title="Password updated!" color="blue">
        Password baru Anda telah berhasil tersimpan. Silakan logout dan login lagi untuk mencoba.
      </Alert>
    );
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
          label="Password"
          value={
            <PasswordInput
              {...form.getInputProps('password')}
              placeholder="Minimum 6 karakter"
              required
            />
          }
        />
        <Datum
          borderBottom
          center
          label="Confirm Password"
          value={
            <PasswordInput
              {...form.getInputProps('confirmPassword')}
              placeholder="Minimum 6 karakter"
              required
            />
          }
        />
        <Datum
          borderTop
          borderBottom
          value={
            <Box py={5}>
              <ButtonXS
                type="dark"
                submit
                label="Save Password"
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
