import { InferGetServerSidePropsType } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import { DefaultUser, sessionOptions, SessionUser } from 'lib/session';
import Layout from 'components/Layout/Layout';

export default function Page({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout title="Honocoroko" user={user}>
      <div>PROFILE</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;

  if (user === undefined || !user.isLoggedIn) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: DefaultUser,
      },
    };
  }

  return {
    props: { user: user as SessionUser },
  };
}, sessionOptions);
