import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<void>) => {
  const { genre, posterPath, rating, title, tmdbId, userId } = req.body;

  const response = await fetch(`${process.env.GCF_URL}/add-movie-to-favorite`, {
    method: 'POST',
    body: JSON.stringify({
      genre,
      posterPath,
      rating,
      title,
      tmdbId,
      userId,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) return res.status(200).send();

  return res.status(500).send();
};

export default handler;
