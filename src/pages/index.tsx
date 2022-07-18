import { Box, Container, Divider, Paper, Text } from '@mantine/core';
import FormForgot from 'components/FormForgot/FormForgot';
import FormLogin from 'components/FormLogin/FormLogin';
import Logo from 'components/Header/Logo';
import useUser from 'lib/useUser';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const { mutateUser } = useUser({ redirectTo: '/projects', redirectIfFound: true });
  const [forgot, setForgot] = useState(false);

  return (
    <Box sx={(theme) => ({ backgroundColor: theme.colors.gray[1], minHeight: '100vh' })}>
      <Container size={400} px={20} py={50}>
        <Paper p="md" mb={5} shadow="xs" withBorder>
          <Logo />
          <Divider my={20} />
          {!forgot && <FormLogin mutateUser={mutateUser} />}
          {forgot && <FormForgot />}
        </Paper>
        <div style={{ marginTop: 8, fontSize: 13, color: 'blue', textAlign: 'center' }}>
          {!forgot && (
            <span style={{ cursor: 'pointer' }} onClick={() => setForgot(!forgot)}>
              Forgot password?
            </span>
          )}
          {forgot && (
            <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => setForgot(!forgot)}>
              Back to Login
            </span>
          )}
        </div>
      </Container>
    </Box>
  );
}
