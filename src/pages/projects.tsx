import Layout from 'components/Layout/Layout';
import { Space } from '@mantine/core';
import { __getProjects } from 'lib/queries/getProjects';
import Projects from 'components/Projects/Projects';
import PageTitle from 'components/PageTitle/PageTitle';
import Block from 'components/Block';
import useAuthApi from 'lib/useAuthApi';
import { useContext } from 'react';
import ProjectsEmpty from 'components/Projects/ProjectsEmpty';
import SessionContext from 'components/SessionProvider/SessionProvider';
import useUser from 'lib/useUser';
import { useRouter } from 'next/router';

export default function Page() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });

  const router = useRouter();
  const id = router.query['id'] as string;
  const { data, error, mutate } = useAuthApi('projects', id);

  const hasProjects = user.roles.includes('project');
  const hasAssignments = user.roles.includes('mentor');

  return (
    <Layout title="My Projects" user={user}>
      {!data && <>...</>}
      {data && (
        <>
          <Block info="__USER_PROJECT__" show={hasProjects}>
            <PageTitle
              title="My Projects"
              button={data.projects.length > 0 ? 'New Project' : ''}
              clickHandler={() => {}}
            />
            {data.projects.length == 0 && <ProjectsEmpty canCreate={true} onClick={() => {}} />}
            {data.projects.length > 0 && <Projects projects={data.projects} />}
          </Block>

          {hasProjects && hasAssignments && <Space h={20} />}

          <Block info="__USER_PROJECT__" show={hasAssignments}>
            <PageTitle title="My Assigments" />
            <Projects projects={data.assignments} />
          </Block>
        </>
      )}
    </Layout>
  );
}
