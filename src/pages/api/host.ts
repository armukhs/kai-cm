import { NextApiRequest, NextApiResponse } from 'next';
import { QUERIES } from 'lib/queries';

export default async function apiGet(req: NextApiRequest, res: NextApiResponse) {
  return res.json({ origin: req.headers.origin });
}
