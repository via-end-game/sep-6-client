import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const response = await fetch(
    `${process.env.GCF_URL}/getListOfLinksToIMages`,
    {
      method: 'GET',
    }
  );

  if (response.ok) {
    return res.status(200).json(await response.json());
  }

  return res.status(response.status).json({ response });
};

export default handler;
