import { useContext } from 'react';
import { useRouter } from 'next/router';
import useAuthApi from 'lib/useAuthApi';
import useUser from 'lib/useUser';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Perubahan from 'components/Perubahan/Perubahan';
import Layout from 'components/Layout/Layout';
import PageTitle from 'components/PageTitle/PageTitle';
import ProjectInfo from 'components/ProjectInfo/ProjectInfo';
import useSWR from 'swr';

const TITLE = 'Project Info';

export default function CSR() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });

  const router = useRouter();
  const id = router.query['id'] as string;
  const { data, error, mutate } = useAuthApi('project', id);

  // Testing preload project data
  const prefix = `/api/auth/get?subject=perubahan&option=`;
  useSWR(prefix + `proses&extra=${id}`);
  useSWR(prefix + `teknologi&extra=${id}`);
  useSWR(prefix + `struktur&extra=${id}`);
  useSWR(prefix + `peran&extra=${id}`);
  useSWR(prefix + `budaya&extra=${id}`);
  useSWR(prefix + `kompetensi&extra=${id}`);
  useSWR(prefix + `lainnya&extra=${id}`);
  const prefix2 = `/api/auth/get?subject=rencana&option`;
  useSWR(prefix2 + `komunikasi&extra=${id}`);
  useSWR(prefix2 + `sponsorship&extra=${id}`);
  useSWR(prefix2 + `development&extra=${id}`);

  return (
    <Layout title={`${TITLE} - ${data ? data.judul : '...'}`} user={user} projectId={id}>
      {!data && <PageTitle title={TITLE} />}
      {data && <ProjectInfo user={user} project={data} />}
    </Layout>
  );
}
