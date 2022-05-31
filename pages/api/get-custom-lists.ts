import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const session = await getSession({ req });

  if (session) {
    const response = await fetch(
      `${process.env.GCF_URL}/get_movies_by_userid?userId=${session.user?.id}`,
      {
        method: 'GET',
      }
    );

    if (response.ok) {
      return res.status(200).json(await response.json());
    }

    return res.status(response.status).json({ response });
  }

  return res.status(401).json({ error: 'Not authenticated' });
};

export default handler;
