import { withIronSessionSsr } from 'iron-session/next';
import { DefaultUser, sessionOptions, SessionUser } from 'lib/session';
import Layout from 'components/Layout/Layout';
import FormProject from 'components/FormProject/FormProject';

export default function Page({ user, code }: { user: SessionUser; code: number }) {
  if (code && code == 401) return <h1>401</h1>;
  return (
    <Layout title="Honocoroko" user={user}>
      <h2 style={{ marginTop: 0 }}>Edit Project Info</h2>
      <FormProject user={user} onCancel={() => window.history.back()} callback={() => {}} />
    </Layout>
  );
}

// @ts-ignore
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

  console.log('REF', req.headers.referer);

  const roles = user.roles;
  if (!roles.includes('project')) {
    return {
      redirect: {
        destination: '/projects',
        permanent: false,
      },
    };
  }

  return {
    props: { user: user as SessionUser, code: 200 },
  };
}, sessionOptions);
