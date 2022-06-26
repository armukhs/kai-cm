import { withIronSessionSsr } from 'iron-session/next';
import { DefaultUser, sessionOptions, SessionUser } from 'lib/session';
import Layout from 'components/Layout/Layout';
import prisma from 'lib/db';
import Link from 'next/link';
import { Button } from '@mantine/core';

export default function ProjectPage({ user, project }: { user: SessionUser; project: any }) {
  return (
    <Layout title="Honocoroko" user={user} project={project}>
      <h2 style={{ marginTop: 0 }}>Project Section</h2>

      <Link href="/new" passHref>
        <Button component="a">New Project</Button>
      </Link>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <pre>{JSON.stringify(project, null, 2)}</pre>
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

  const url = req.url;
  let projectId = '';
  if (url?.includes('projectId')) {
    projectId = url.split('=').pop() as string;
  } else {
    projectId = url?.split('/').pop() as string;
  }
  console.log('ID', projectId);

  const project = await prisma.project.findFirst({
    where: { id: projectId },
    select: {
      id: true,
      managerId: true,
      mentorId: true,
      staffId: true,
      judul: true,
      Unit: { select: { id: true, kode: true, nama: true } },
      Manager: {
        select: { id: true, nama: true, Jabatan: { select: { kode: true, nama: true } } },
      },
      Mentor: {
        select: { id: true, nama: true, Jabatan: { select: { kode: true, nama: true } } },
      },
    },
    orderBy: { created: 'asc' },
  });

  return {
    props: { user: user as SessionUser, project: project },
  };
}, sessionOptions);
