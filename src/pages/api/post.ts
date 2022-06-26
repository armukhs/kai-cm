import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from 'lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { MUTATIONS } from 'lib/mutations';

async function apiRoutes(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user;

  // if (!user || user.isLoggedIn === false) {
  //   return res.status(401).json({ message: 'Forbidden' });
  // }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Find 'subject' key(s) in query
  let subject = req.query.subject;
  if (subject === undefined) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  // Key in req.query can be string or string[]
  if (Array.isArray(subject)) subject = subject[0];

  // @ts-ignore
  if (MUTATIONS[subject] === undefined) {
    return res.status(500).json({ message: 'Sorry, this error comes from us.' });
  }
  console.log('subject', subject);

  // @ts-ignore
  const handler = MUTATIONS[subject];
  return handler(req, res);
}

export default withIronSessionApiRoute(apiRoutes, sessionOptions);
