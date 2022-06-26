import { InferGetServerSidePropsType } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import { DefaultUser, sessionOptions, SessionUser } from 'lib/session';
import Layout from 'components/Layout/Layout';
import prisma from 'lib/db';
import Link from 'next/link';
import { Button } from '@mantine/core';

// InferGetServerSidePropsType<typeof getServerSideProps>

export default function Page({ user, projects }: { user: SessionUser; projects: any[] }) {
  return (
    <Layout title="Honocoroko" user={user}>
      <h2 style={{ marginTop: 0 }}>My Projects</h2>
      {projects &&
        projects.map((project: any) => (
          <div key={project.id} style={{ marginBottom: 6 }}>
            <Link href={`/project/${project.id}`}>
              <a>{project.judul}</a>
            </Link>
          </div>
        ))}
      <Link href="/new" passHref>
        <Button component="a">New Project</Button>
      </Link>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(projects, null, 2)}</pre> */}
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

  const projects = await prisma.project.findMany({
    where: {
      OR: [{ managerId: user.id }, { staffId: user.id }],
    },
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
    props: { user: user as SessionUser, projects: projects },
  };
}, sessionOptions);
