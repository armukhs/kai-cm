import { useRouter } from 'next/router';
import { useContext } from 'react';
import SessionContext from 'components/SessionProvider/SessionProvider';
import useAuthApi from 'lib/useAuthApi';
import Pojo from 'components/Pojo';
import useUser from 'lib/useUser';
import ProjectInfo from 'components/ProjectInfo/ProjectInfo';

export default function CSR() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });
  const router = useRouter();
  const id = router.query['id'] as string;
  const { data, error, mutate } = useAuthApi('project', id);

  // if (!user || !user.isLoggedIn || !data) return <></>;

  return <ProjectInfo user={user} project={data} />;
}
