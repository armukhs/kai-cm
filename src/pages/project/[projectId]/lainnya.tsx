import { withIronSessionSsr } from 'iron-session/next';
import { DefaultUser, sessionOptions, SessionUser } from 'lib/session';
import { __getPerubahan } from 'lib/queries/getPerubahan';
import ProjectNotFound from 'components/ProjectNotFound/ProjectNotFound';
import Perubahan from 'components/Perubahan/Perubahan';
import { extractProjectId } from 'lib/utils';

const TYPE = 'lainnya';
const TITLE = 'Lainnya';

export default function ProjectPage({
  user,
  project,
  perubahans,
}: {
  user: SessionUser;
  project: any;
  perubahans: any[];
}) {
  if (!project) return <ProjectNotFound />;

  return (
    <Perubahan type={TYPE} title={TITLE} user={user} project={project} perubahans={perubahans} />
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
  const rs = await __getPerubahan(TYPE, projectId);

  return {
    props: { user: user as SessionUser, project: rs?.project, perubahans: rs?.perubahans },
  };
}, sessionOptions);
