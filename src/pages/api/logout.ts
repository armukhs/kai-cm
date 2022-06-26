import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultUser, sessionOptions, SessionUser } from '../../lib/session';

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse<SessionUser>) {
  req.session.destroy();
  res.json(DefaultUser);
}
