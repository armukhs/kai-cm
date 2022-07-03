import {
  Box,
  Button,
  Container,
  Divider,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Table,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Logo from 'components/Header/Logo';
import SessionContext from 'components/SessionProvider/SessionProvider';
import fetchJson from 'lib/fetchJson';
import { SessionUser } from 'lib/session';
import useApi from 'lib/useApi';
import { createPostData } from 'lib/utils';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export default function Token() {
  const router = useRouter();
  const token = router.query['token'] as string;
  const { data, error, mutate } = useApi('invitation', token);

  const { setSessionUser } = useContext(SessionContext);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      invitationId: '',
      unitId: '',
      jabatan: '',
      jabatanId: '',
      nipp: '',
      email: '',
      nama: '',
      roles: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) => (value.length > 5 ? null : 'Min. 6 karakter'),
      confirmPassword: (value, values) =>
        value == values['password'] ? null : 'Password tidak sama',
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldValue('invitationId', data.id);
      form.setFieldValue('unitId', data.unitId);
      form.setFieldValue('jabatan', data.jabatan);
      form.setFieldValue('jabatanId', data.jabatanId);
      form.setFieldValue('nipp', data.nipp);
      form.setFieldValue('email', data.email);
      form.setFieldValue('nama', data.nama);
      form.setFieldValue('roles', data.roles);
    }
    return () => {};
  }, [data]);

  async function handleSubmit(values: typeof form.values) {
    // create-invitation
    setSubmitting(true);
    try {
      const rs = await fetchJson('/api/post?subject=new-user', createPostData(values));
      form.reset();
      setSessionUser(rs as SessionUser);
      router.push('/projects');
    } catch (error) {}
    setSubmitting(false);
  }

  if (!data && !error) {
    return <></>;
  }

  if (error) {
    return <h1>Invalid Token</h1>;
  }

  return (
    <Box sx={(theme) => ({ backgroundColor: theme.colors.gray[1], minHeight: '100vh' })}>
      <Container size={460} px={20} py={50}>
        {/* <Pojo obj={data} /> */}
        {/* <Pojo obj={form.values} /> */}
        <Paper p="md" shadow="xs" withBorder>
          <Logo />
          <Divider my={20} />
          <Title order={4} mb={16} sx={{ fontWeight: 500 }}>
            Selamat Datang
          </Title>
          <LoadingOverlay visible={submitting} />
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <div style={{ border: '1px solid #ddd', marginBottom: 16 }}>
              <Table>
                <tbody>
                  <tr>
                    <td>Nama:</td>
                    <td>{data.nama}</td>
                  </tr>
                  <tr>
                    <td>NIPP:</td>
                    <td>{data.nipp}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{data.email}</td>
                  </tr>
                  <tr>
                    <td>Jabatan:</td>
                    <td>{data.jabatan}</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <p style={{ fontSize: 14 }}>Silakan membuat password.</p>

            <PasswordInput
              {...form.getInputProps('password')}
              label="Password"
              required
              mb={5}
              styles={{
                label: { fontSize: 13 },
              }}
              onChange={(ev) => {
                form.setFieldValue('password', ev.currentTarget.value);
                form.clearFieldError('password');
              }}
            />
            <PasswordInput
              {...form.getInputProps('confirmPassword')}
              label="Confirm Password"
              required
              mb={5}
              styles={{
                label: { fontSize: 13 },
              }}
              onChange={(ev) => {
                form.setFieldValue('confirmPassword', ev.currentTarget.value);
                form.clearFieldError('confirmPassword');
              }}
            />

            <Button mt={10} type="submit">
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
