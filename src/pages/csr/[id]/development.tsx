import { useContext } from 'react';
import { useRouter } from 'next/router';
import useAuthApi from 'lib/useAuthApi';
import useUser from 'lib/useUser';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Layout from 'components/Layout/Layout';
import PageTitle from 'components/PageTitle/PageTitle';
import Rencana from 'components/Rencana/Rencana';

const TYPE = 'development';
const TITLE = 'Rencana Development';

export default function CSR() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });

  const router = useRouter();
  const id = router.query['id'] as string;
  const { data, mutate } = useAuthApi('rencana', TYPE, id);

  return (
    <Layout title={`${TITLE} - ${data ? data.project.judul : '...'}`} user={user} projectId={id}>
      {!data && <PageTitle title={TITLE} />}
      {data && (
        <Rencana
          type={TYPE}
          title={TITLE}
          user={user}
          project={data.project}
          rencanas={data.rencanas}
          mutate={mutate}
        />
      )}
    </Layout>
  );
}
