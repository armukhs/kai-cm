import { withIronSessionSsr } from 'iron-session/next';
import { Box, Container, Divider, Paper } from '@mantine/core';
import FormLogin from 'components/FormLogin/FormLogin';
import Logo from 'components/Header/Logo';
import { DefaultUser, SessionUser, sessionOptions } from 'lib/session';
import useUser from 'lib/useUser';

export default function Page({ user }: { user: SessionUser }) {
  const { mutateUser } = useUser({ redirectTo: '/projects', redirectIfFound: true });

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

// @ts-ignore
export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;

  if (user && user.isLoggedIn) {
    return {
      redirect: {
        destination: '/projects',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: DefaultUser,
    },
  };
}, sessionOptions);
