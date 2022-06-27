import { withIronSessionSsr } from 'iron-session/next';
import { DefaultUser, sessionOptions, SessionUser } from 'lib/session';
import { extractProjectId } from 'lib/utils';
import { __getAnalisis } from 'lib/queries/getAnalisis';
import ProjectNotFound from 'components/ProjectNotFound/ProjectNotFound';
import Analisis from 'components/Analisis/Analisis';

export default function ProjectPage({
  user,
  project,
  bobot,
  kesiapan,
  units,
}: {
  user: SessionUser;
  project: any;
  bobot: any;
  kesiapan: any;
  units: any[];
}) {
  if (!project) return <ProjectNotFound />;

  return (
    <Analisis
      title="Analisis"
      user={user}
      project={project}
      bobot={bobot}
      kesiapan={kesiapan}
      units={units}
    />
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

  let projectId = extractProjectId(req.url as string);
  // @ts-ignore
  const { project, bobot, kesiapan, units } = await __getAnalisis(projectId);

  return {
    props: { user: user as SessionUser, project, bobot, kesiapan, units },
  };
}, sessionOptions);
