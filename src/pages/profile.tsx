import { useContext } from 'react';
import useUser from 'lib/useUser';
import Layout from 'components/Layout/Layout';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Pojo from 'components/Pojo';
import PageTitle from 'components/PageTitle/PageTitle';
import FormProfile from 'components/FormProfile/FormProfile';
import FormPassword from 'components/FormPassword/FormPassword';

export default function Page() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });

  return (
    <Layout title="Profile - KAI CM Projects" user={user}>
      <PageTitle title="Profile" />
      <FormProfile user={user} />
      <h3>Change password</h3>
      <FormPassword user={user} />
    </Layout>
  );
}
