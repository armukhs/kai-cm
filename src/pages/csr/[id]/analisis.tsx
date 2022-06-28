import { useContext } from 'react';
import { useRouter } from 'next/router';
import useAuthApi from 'lib/useAuthApi';
import useUser from 'lib/useUser';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Perubahan from 'components/Perubahan/Perubahan';
import Layout from 'components/Layout/Layout';
import PageTitle from 'components/PageTitle/PageTitle';
import Analisis from 'components/Analisis/Analisis';

const TYPE = 'analisis';
const TITLE = 'Analisis';

export default function CSR() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });

  const router = useRouter();
  const id = router.query['id'] as string;
  // project, bobot, kesiapan, units
  const { data, error, mutate } = useAuthApi('analisis', id);

  return (
    <Layout title={`${TITLE} - ${data ? data.project.judul : '...'}`} user={user} projectId={id}>
      <PageTitle title={TITLE} />
      {data && (
        <Analisis
          title="Analisis"
          user={user}
          project={data.project}
          bobot={data.bobot}
          kesiapan={data.kesiapan}
          units={data.units}
          mutate={mutate}
        />
      )}
    </Layout>
  );
}
