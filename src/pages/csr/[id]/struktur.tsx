import { useContext } from 'react';
import { useRouter } from 'next/router';
import useAuthApi from 'lib/useAuthApi';
import useUser from 'lib/useUser';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Perubahan from 'components/Perubahan/Perubahan';

const TYPE = 'struktur';
const TITLE = 'Perubahan Struktur Organisasi';

export default function CSR() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });

  const router = useRouter();
  const id = router.query['id'] as string;
  const { data, error, mutate } = useAuthApi('perubahan', TYPE, id);

  // Loading...
  // if (!user || !user.isLoggedIn || !data) return <></>;

  return (
    <Perubahan
      type={TYPE}
      title={TITLE}
      user={user}
      project={data.project}
      perubahans={data.perubahans}
    />
  );
}
