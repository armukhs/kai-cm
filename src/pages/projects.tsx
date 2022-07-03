import { useContext } from 'react';
import useAuthApi from 'lib/useAuthApi';
import useUser from 'lib/useUser';
import Layout from 'components/Layout/Layout';
import SessionContext from 'components/SessionProvider/SessionProvider';
import UserProjects from 'components/Projects/UserProjects';
import AdminProjects from 'components/Projects/AdminProjects';

export default function Page() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });

  // projects, assignments
  const { data, error, mutate } = useAuthApi('projects');

  // projects, newProjects, mentors
  const { data: data2, error: error2, mutate: mutate2 } = useAuthApi('admin-projects');

  const isAdmin = user.roles.includes('admin');

  if (!data || !data2) {
    return (
      <Layout title="KAI CM Projects" user={user}>
        <>&nbsp;</>
      </Layout>
    );
  }

  if (isAdmin && data2) {
    return (
      <AdminProjects
        user={user}
        projects={data2.projects}
        newProjects={data2.newProjects}
        mentors={data2.mentors}
        mutate={mutate2}
      />
    );
  }

  return <UserProjects user={user} projects={data.projects} assignments={data.assignments} />;
}
