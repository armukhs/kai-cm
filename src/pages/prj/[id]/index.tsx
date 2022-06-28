import { useContext } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useAuthApi from 'lib/useAuthApi';
import useUser from 'lib/useUser';
import { projectPrefetchLinks } from 'lib/utils';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Layout from 'components/Layout/Layout';
import PageTitle from 'components/PageTitle/PageTitle';
import ProjectInfo from 'components/ProjectInfo/ProjectInfo';

const TITLE = 'Project Info';

export default function CSR() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });

  const router = useRouter();
  const id = router.query['id'] as string;
  const { data, error, mutate } = useAuthApi('project', id);

  const links = projectPrefetchLinks(id);
  links.forEach((link) => {
    useSWR(link);
  });

  if (!data) {
    return (
      <Layout title={`${TITLE} - ${data ? data.judul : '...'}`} user={user} projectId={id}>
        <PageTitle title={TITLE} />
      </Layout>
    );
  }

  return (
    <Layout title={`${TITLE} - ${data ? data.judul : '...'}`} user={user} projectId={id}>
      <ProjectInfo user={user} project={data} />
    </Layout>
  );
}
