import { NextApiRequest, NextApiResponse } from 'next';
import { AUTH_QUERIES } from 'lib/queries';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from 'lib/session';

async function apiGet(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user;

  if (!user || user.isLoggedIn === false) {
    return res.status(401).json({ message: 'Forbidden' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  let subject = req.query.subject;
  if (subject === undefined) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  if (Array.isArray(subject)) subject = subject[0];

  // @ts-ignore
  if (AUTH_QUERIES[subject] === undefined) {
    return res.status(500).json({ message: 'Sorry, this error comes from us.' });
  }
  console.log('subject', subject);

  // @ts-ignore
  const handler = AUTH_QUERIES[subject];
  return handler(req, res);
}

export default withIronSessionApiRoute(apiGet, sessionOptions);
