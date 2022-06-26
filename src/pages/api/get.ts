import { NextApiRequest, NextApiResponse } from 'next';
import { QUERIES } from 'lib/queries';

export default async function apiGet(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  let subject = req.query.subject;
  if (subject === undefined) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  if (Array.isArray(subject)) subject = subject[0];

  // @ts-ignore
  if (QUERIES[subject] === undefined) {
    return res.status(500).json({ message: 'Sorry, this error comes from us.' });
  }
  console.log('subject', subject);

  // @ts-ignore
  const handler = QUERIES[subject];
  return handler(req, res);
}
