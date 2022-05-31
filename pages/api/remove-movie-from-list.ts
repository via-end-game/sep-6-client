import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse<void>) => {
  const session = await getSession({ req });

  if (session) {
    const { movieId, userListId } = req.body;

    console.log('Trying to remove movie ->', {
      movieId,
      userListId: parseInt(userListId),
      userId: session.user?.id,
    });

    const response = await fetch(
      `${process.env.GCF_URL}/remove_movie_from_user_list`,
      {
        body: JSON.stringify({
          movieId,
          userListId: parseInt(userListId),
          userId: session.user?.id,
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }
    );

    if (response.ok) return res.status(200).send(await response.json());

    if (response.status !== 500) return res.status(401).send();
  }

  return res.status(500).send();
};

export default handler;
