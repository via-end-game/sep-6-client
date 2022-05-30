import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse<void>) => {
  const session = await getSession({ req });

  if (session) {
    const { genre, posterPath, rating, title, tmdbID, userListID } = req.body;

    const response = await fetch(
      `${process.env.GCF_URL}/add_movie_to_user_list`,
      {
        body: JSON.stringify({
          genre,
          posterPath,
          rating,
          title,
          tmdbID,
          userListID,
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

// {
//   "title": "Top Gun: Maverick",
//   "rating": 8.5,
//   "posterPath": "/wxP2Mzv9CdjOK6t4dNnFGqIQl0V.jpg",
//   "genre": "Action",
//   "tmdbID": 361743,
//   "userListID": 12,
//   "userId": 10
// }
