import { withIronSessionSsr } from 'iron-session/next';
import { DefaultUser, sessionOptions, SessionUser } from 'lib/session';
import Layout from 'components/Layout/Layout';
import { Space } from '@mantine/core';
import { __getProjects } from 'lib/queries/getProjects';
import Projects from 'components/Projects/Projects';
import PageTitle from 'components/PageTitle/PageTitle';
import ButtonPrimary from 'components/PageTitle/ButtonPrimary';
import Block from 'components/Block';
import useAuthApi from 'lib/useAuthApi';
import { useEffect, useState } from 'react';
import ProjectsEmpty from 'components/Projects/ProjectsEmpty';

export default function Page({
  user,
  projects,
  assignments,
}: {
  user: SessionUser;
  projects: any[];
  assignments: any[];
}) {
  const { data } = useAuthApi('projects');
  const hasProjects = user.roles.includes('project');
  const hasAssignments = user.roles.includes('mentor');

  const [projectsSync, setProjectsSync] = useState(projects);
  const [assignmentsSync, setAssignmentsSync] = useState(assignments);

  useEffect(() => {
    if (data) {
      setProjectsSync(data.projects);
      setAssignmentsSync(data.assignments);
    }
    return () => {};
  }, [data]);

  return (
    <Layout title="Honocoroko" user={user}>
      <Block info="__USER_PROJECT__" show={hasProjects}>
        <PageTitle
          title="My Projects"
          button={projectsSync.length > 0 ? 'New Project' : ''}
          clickHandler={() => {}}
        />
        {projectsSync.length == 0 && <ProjectsEmpty canCreate={true} onClick={() => {}} />}
        {projectsSync.length > 0 && <Projects projects={projectsSync} />}
      </Block>

      {hasProjects && hasAssignments && <Space h={20} />}

      <Block info="__USER_PROJECT__" show={hasAssignments}>
        <PageTitle title="My Assigments" />
        <Projects projects={assignmentsSync} />
      </Block>
    </Layout>
  );
}

// @ts-ignore
export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;

  if (user === undefined || !user.isLoggedIn) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: DefaultUser,
      },
    };
  }

  // @ts-ignore
  const { projects, assignments } = await __getProjects(user.id);

  return {
    props: { user: user as SessionUser, projects, assignments },
  };
}, sessionOptions);
