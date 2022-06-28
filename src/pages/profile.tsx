import { useContext } from 'react';
import useUser from 'lib/useUser';
import Layout from 'components/Layout/Layout';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Pojo from 'components/Pojo';
import PageTitle from 'components/PageTitle/PageTitle';

export default function Page() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });

  <Layout title="Profile - KAI CM Projects" user={user}>
    <PageTitle title="Profile" />
    <Pojo object={user} />
  </Layout>;
}
