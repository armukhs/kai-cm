import { withIronSessionSsr } from 'iron-session/next';
import { DefaultUser, sessionOptions, SessionUser } from 'lib/session';
import { extractProjectId } from 'lib/utils';
import ProjectNotFound from 'components/ProjectNotFound/ProjectNotFound';
import { __getRencana } from 'lib/queries/getRencana';
import Rencana from 'components/Rencana/Rencana';

const TYPE = 'komunikasi';
const TITLE = 'Rencana Komunikasi';

export default function ProjectPage({
  user,
  project,
  rencanas,
}: {
  user: SessionUser;
  project: any;
  rencanas: any[];
}) {
  if (!project) return <ProjectNotFound />;

  return <Rencana user={user} project={project} rencanas={rencanas} type={TYPE} title={TITLE} />;
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
  const rs = await __getRencana(TYPE, projectId);

  return {
    props: { user: user as SessionUser, project: rs?.project, rencanas: rs?.rencanas },
  };
}, sessionOptions);
