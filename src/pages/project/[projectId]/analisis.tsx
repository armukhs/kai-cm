import { withIronSessionSsr } from 'iron-session/next';
import { DefaultUser, sessionOptions, SessionUser } from 'lib/session';
import { extractProjectId } from 'lib/utils';
import { __getAnalisis } from 'lib/queries/getAnalisis';
import ProjectNotFound from 'components/ProjectNotFound/ProjectNotFound';
import Analisis from 'components/Analisis/Analisis';

export default function ProjectPage({
  user,
  project,
  analisis,
}: {
  user: SessionUser;
  project: any;
  analisis: any;
}) {
  if (!project) return <ProjectNotFound />;

  return <Analisis title="Analisis" user={user} project={project} analisis={analisis} />;
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

  let projectId = extractProjectId(req.url as string);
  const rs = await __getAnalisis(projectId);

  return {
    props: { user: user as SessionUser, project: rs?.project, analisis: rs?.analisis },
  };
}, sessionOptions);
