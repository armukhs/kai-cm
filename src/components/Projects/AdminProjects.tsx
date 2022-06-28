import { useState } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import Link from 'next/link';
import { createStyles, Space, Stack, Table } from '@mantine/core';
import cfg from 'lib/config';
import { SessionUser } from 'lib/session';
import Block from 'components/Block';
import Layout from 'components/Layout/Layout';
import NewProjectCard from 'components/NewProjectCard/NewProjectCard';
import PageTitle from 'components/PageTitle/PageTitle';

export default function AdminProjects({
  user,
  projects,
  newProjects,
  mentors,
  mutate,
}: {
  user: SessionUser;
  projects: any[];
  newProjects: any[];
  mentors: any[];
  mutate: KeyedMutator<any>;
}) {
  const { classes } = useStyles();
  const [selectedCard, setSelectedCard] = useState<any | null>(null);

  // Prefetch projects data
  // projects.forEach((p) => {
  //   useSWR(`/api/auth/get?subject=project&option=${p.id}`);
  // });

  return (
    <Layout title="KAI CM Projects" user={user}>
      <PageTitle title="New Projects" />

      {newProjects.length == 0 && (
        <p style={{ color: '#567' }}>- Tidak ada registrasi proyek baru.</p>
      )}

      <Block mode="new" info="__NEW_PROJECTS__" show={newProjects.length > 0}>
        <Stack spacing="xs">
          {newProjects.map((np) => (
            <NewProjectCard
              key={np.id}
              project={np}
              mentors={mentors}
              selected={selectedCard == np}
              onSelect={setSelectedCard}
              mutate={mutate}
            />
          ))}
        </Stack>
      </Block>

      <Space h={40} />

      <h3 style={{ fontWeight: 500, marginBottom: 10, color: '#567' }}>
        Project yang sudah memiliki mentor/pendamping
      </h3>

      <Table
        sx={(theme) => ({
          borderTopWidth: 1,
          borderTopStyle: 'solid',
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          borderColor: theme.colors.gray[3],
        })}
      >
        <tbody>
          {projects.map((prj, index) => (
            <ProjectRow key={prj.id} project={prj} index={index} />
          ))}
        </tbody>
      </Table>
    </Layout>
  );
}

function ProjectRow({ project, index }: { project: any; index: number }) {
  const { classes } = useStyles();
  // Prefetch
  useSWR(`/api/auth/get?subject=project&option=${project.id}`);

  return (
    <tr>
      <td width={15} align="center" style={{ color: 'gray' }}>
        {index + 1}
      </td>
      <td width={15} style={{ fontWeight: 500, color: '#789' }}>
        {project.Unit.kode}
      </td>
      <td className={classes.ellipsis}>
        <Link key={project.id} href={`${cfg.PROJECTPATH}/${project.id}`}>
          <a className={classes.anchor}>{project.judul}</a>
        </Link>
      </td>
    </tr>
  );
}

const useStyles = createStyles((theme) => ({
  ellipsis: {
    width: '100%',
    maxWidth: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  anchor: {
    textDecoration: 'none',
    color: theme.colors.indigo[7],
    ':hover': {
      textDecoration: 'underline',
      color: theme.colors.indigo[5],
    },
  },
}));
