import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthApi from 'lib/useAuthApi';
import useUser from 'lib/useUser';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Perubahan from 'components/Perubahan/Perubahan';
import Layout from 'components/Layout/Layout';
import PageTitle from 'components/PageTitle/PageTitle';

const TYPE = 'proses';
const TITLE = 'Perubahan Proses Bisnis';

export default function CSR() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });

  const router = useRouter();
  const id = router.query['id'] as string;
  const { data, error, mutate } = useAuthApi('perubahan', TYPE, id);

  useEffect(() => {
    console.log('ID', id);
    if (id) {
      const prefix = `/csr/${id}`;
      router.prefetch(`${prefix}`);
      router.prefetch(`${prefix}/teknologi`);
      router.prefetch(`${prefix}/struktur`);
      router.prefetch(`${prefix}/peran`);
      router.prefetch(`${prefix}/budaya`);
      router.prefetch(`${prefix}/kompetensi`);
      router.prefetch(`${prefix}/lainnya`);
      router.prefetch(`${prefix}/analisis`);
      router.prefetch(`${prefix}/komunikasi`);
      router.prefetch(`${prefix}/sponsorship`);
      router.prefetch(`${prefix}/development`);
      console.log('Finished prefetching...');
    }
  }, [id]);

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
