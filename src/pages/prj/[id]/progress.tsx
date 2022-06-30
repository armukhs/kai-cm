import Layout from 'components/Layout/Layout';
import PageTitle from 'components/PageTitle/PageTitle';
import Pojo from 'components/Pojo';
import SessionContext from 'components/SessionProvider/SessionProvider';
import useAuthApi from 'lib/useAuthApi';
import useUser from 'lib/useUser';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function ProgressIndex() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });

  const router = useRouter();
  const id = router.query['id'] as string;
  const { data, error, mutate } = useAuthApi('progress', id);

  return (
    <Layout title="Progress - KAI CM Projects" user={user}>
      <PageTitle title="Progress" />
      <Pojo object={data ? data : {}} />
    </Layout>
  );
}
