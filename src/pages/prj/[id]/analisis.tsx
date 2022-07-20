import { useContext } from 'react';
import { useRouter } from 'next/router';
import useAuthApi from 'lib/useAuthApi';
import useUser from 'lib/useUser';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Layout from 'components/Layout/Layout';
import PageTitle from 'components/PageTitle/PageTitle';
import Analisis from 'components/Analisis/Analisis';
import useSWR from 'swr';
import { projectPrefetchLinks } from 'lib/utils';
import Pojo from 'components/Pojo';

const TYPE = 'analisis';
const TITLE = 'Analisis';

export default function CSR() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });

  const router = useRouter();
  const id = router.query['id'] as string;
  // project, bobot, kesiapan, units
  const { data, error, mutate } = useAuthApi('analisis', id);

  const links = projectPrefetchLinks(id);
  links.forEach((link) => {
    useSWR(link);
  });

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
      {/* {data && <Pojo object={data} />} */}
    </Layout>
  );
}
