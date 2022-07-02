import { useContext } from 'react';
import { useRouter } from 'next/router';
import useAuthApi from 'lib/useAuthApi';
import useUser from 'lib/useUser';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Perubahan from 'components/Perubahan/Perubahan';
import Layout from 'components/Layout/Layout';
import PageTitle from 'components/PageTitle/PageTitle';
import useSWR from 'swr';
import { projectPrefetchLinks } from 'lib/utils';

const TYPE = 'proses';
const TITLE = 'Perubahan Proses Bisnis';

export default function CSR() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });

  const router = useRouter();
  const id = router.query['id'] as string;
  const { data, error, mutate } = useAuthApi('perubahan', TYPE, id);

  const links = projectPrefetchLinks(id);
  links.forEach((link) => {
    useSWR(link);
  });

  if (!data) {
    return (
      <Layout title={`${TITLE} - ${data ? data.project.judul : '...'}`} user={user} projectId={id}>
        <PageTitle title={TITLE} />
      </Layout>
    );
  }

  return (
    <Layout title={`${TITLE} - ${data ? data.project.judul : '...'}`} user={user} projectId={id}>
      <Perubahan
        type={TYPE}
        title={TITLE}
        user={user}
        project={data.project}
        perubahans={data.perubahans}
      />
    </Layout>
  );
}
