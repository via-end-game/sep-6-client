import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  avatarUrl: string;
  email: string;
  name: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) => {
  if (req.method !== 'POST') return;

  const data = req.body;
  const { avatarUrl, email, name, password } = data;

  try {
    const response = await fetch('http://localhost:3005/register', {
      body: JSON.stringify({ avatarUrl, email, username: name, password }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const data = await response.json();

    if (response.status === 201) {
      console.log('Created user ->', data);

      return res.status(201).json(data);
    }

    return res.status(response.status).send(data);
  } catch (error) {
    console.error('Error while trying to register the user ->', error);
    return res.status(500).json({ error });
  }
};

export default handler;
