import { useContext } from 'react';
import { useRouter } from 'next/router';
import useAuthApi from 'lib/useAuthApi';
import useUser from 'lib/useUser';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Perubahan from 'components/Perubahan/Perubahan';
import Layout from 'components/Layout/Layout';
import PageTitle from 'components/PageTitle/PageTitle';

const TYPE = 'peran';
const TITLE = 'Perubahan Peran & Tanggungjawab';

export default function CSR() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });

  const router = useRouter();
  const id = router.query['id'] as string;
  const { data, error, mutate } = useAuthApi('perubahan', TYPE, id);

  return (
    <Layout title={`${TITLE} - ${data ? data.project.judul : '...'}`} user={user} projectId={id}>
      {!data && <PageTitle title={TITLE} />}
      {data && (
        <Perubahan
          type={TYPE}
          title={TITLE}
          user={user}
          project={data.project}
          perubahans={data.perubahans}
        />
      )}
    </Layout>
  );
}
