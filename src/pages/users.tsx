import { InferGetServerSidePropsType } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import { DefaultUser, sessionOptions, SessionUser } from 'lib/session';
import Layout from 'components/Layout/Layout';
import FormProject from 'components/FormProject/FormProject';

// export default function Page({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
export default function Page({ user }: { user: SessionUser }) {
  return (
    <Layout title="Honocoroko" user={user}>
      USERS
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
