import { Box, Container, Divider, Paper } from '@mantine/core';
import FormLogin from 'components/FormLogin/FormLogin';
import Logo from 'components/Header/Logo';
import useUser from 'lib/useUser';

export default function Page() {
  const { mutateUser } = useUser({ redirectTo: '/profile', redirectIfFound: true });

  return (
    <Box sx={(theme) => ({ backgroundColor: theme.colors.gray[1], minHeight: '100vh' })}>
      <Container size={400} px={20} py={50}>
        <Paper p="md" shadow="xs" withBorder>
          <Logo />
          <Divider my={20} />
          <FormLogin mutate={mutateUser} />
        </Paper>
      </Container>
    </Box>
  );
}
