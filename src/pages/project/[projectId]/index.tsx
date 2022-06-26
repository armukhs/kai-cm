import { withIronSessionSsr } from 'iron-session/next';
import { DefaultUser, sessionOptions, SessionUser } from 'lib/session';
import { __getProject } from 'lib/queries/getProject';
import ProjectNotFound from 'components/ProjectNotFound/ProjectNotFound';
import ProjectInfo from 'components/ProjectInfo/ProjectInfo';

export default function ProjectPage({ user, project }: { user: SessionUser; project: any }) {
  if (!project) return <ProjectNotFound />;
  return <ProjectInfo user={user} project={project} />;
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

  const rs = await __getProject(projectId);
  const project = JSON.parse(JSON.stringify(rs));

  return {
    props: { user: user as SessionUser, project: project },
  };
}, sessionOptions);
