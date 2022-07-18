import useApi from 'lib/useApi';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  Divider,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import Logo from 'components/Header/Logo';
import Pojo from 'components/Pojo';
import fetchJson from 'lib/fetchJson';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const router = useRouter();
  const token = Array.isArray(router.query.reset)
    ? router.query.reset[0]
    : router.query.reset || '';
  const { data, error } = useApi('reset-password', token);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      // email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (/^\S+$/.test(value) && value.length > 5 ? null : 'Invalid password'),
      confirmPassword: (value, values) => (value !== values.password ? 'Harus sama' : null),
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldValue('email', data.email);
    }
  }, [data]);

  async function submitHandler(values: typeof form.values) {
    setSubmitting(true);
    try {
      await fetchJson('/api/post?subject=change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: data.userId,
          email: form.values['email'].toLowerCase(),
          token: token,
          password: form.values['password'],
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  }

  if (!data && !error) return <>...</>;

  if (error)
    return (
      <div>
        <h1>Error</h1>
      </div>
    );

  return (
    <Box sx={(theme) => ({ backgroundColor: theme.colors.gray[1], minHeight: '100vh' })}>
      <Container size={400} px={20} py={50}>
        <Paper p="md" mb={5} shadow="xs" withBorder>
          <Logo />
          <Divider my={20} />
          <div style={{ position: 'relative' }}>
            <LoadingOverlay visible={submitting} />
            {!submitted && (
              <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
                <Stack spacing="sm">
                  <TextInput
                    {...form.getInputProps('email')}
                    label="Email Anda:"
                    autoFocus={true}
                    disabled
                  />
                  <Text py={10}>Masukkan password baru, minimal 6 karakter.</Text>
                  <PasswordInput
                    {...form.getInputProps('password')}
                    label="New password"
                    autoFocus={true}
                    required
                  />
                  <PasswordInput
                    {...form.getInputProps('confirmPassword')}
                    label="Confirm password"
                    autoFocus={true}
                    required
                  />
                  <Button mt={10} type="submit">
                    Submit
                  </Button>
                </Stack>
              </form>
            )}
            {submitted && (
              <div style={{ margin: '50px 0' }}>
                <Text mb={20}>Anda telah berhasil mengganti password.</Text>
                <Link href="/">
                  <a style={{ color: 'blue' }}>Klik di sini untuk ke halaman login.</a>
                </Link>
              </div>
            )}
          </div>
        </Paper>
        {/* <Pojo object={form.values} /> */}
      </Container>
    </Box>
  );
}
