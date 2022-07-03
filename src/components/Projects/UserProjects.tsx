import { useState } from 'react';
import { Space } from '@mantine/core';
import Block from 'components/Block';
import FormProject from 'components/FormProject/FormProject';
import Layout from 'components/Layout/Layout';
import PageTitle from 'components/PageTitle/PageTitle';
import { SessionUser } from 'lib/session';
import Projects from './Projects';
import ProjectsEmpty from './ProjectsEmpty';

export default function UserProjects({
  user,
  projects,
  assignments,
}: {
  user: SessionUser;
  projects: any[];
  assignments: any[];
}) {
  const [showForm, setShowForm] = useState(false);
  const hasProjects = user.roles.includes('project');
  const hasAssignments = user.roles.includes('mentor');

  return (
    <Layout title="My Projects" user={user}>
      <Block info="__FORM__" show={showForm} mode="new">
        <PageTitle title="Register Project" />
        <FormProject user={user} onCancel={() => setShowForm(false)} callback={() => {}} />
      </Block>

      <Block info="__USER_PROJECT__" show={hasProjects && !showForm}>
        <PageTitle
          title="My Projects"
          button={projects.length > 0 ? 'New Project' : ''}
          clickHandler={() => setShowForm(true)}
        />
        {projects.length == 0 && (
          <ProjectsEmpty canCreate={true} onClick={() => setShowForm(true)} />
        )}
        {projects.length > 0 && <Projects projects={projects} />}
      </Block>

      {hasProjects && hasAssignments && <Space h={20} />}

      <Block info="__USER_PROJECT__" show={hasAssignments && !showForm}>
        <PageTitle title="My Assigments" />
        <Projects projects={assignments} />
      </Block>
    </Layout>
  );
}
