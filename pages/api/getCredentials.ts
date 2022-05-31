import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { NextApiRequest, NextApiResponse } from 'next';

const parent = 'projects/1037204785736/';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  let keys = ['bucket', 'project_id', 'TMDB_API_KEY'];
  let secrets = {};
  const client = new SecretManagerServiceClient();
  for (const s of keys) {
    const [secret] = await client.accessSecretVersion({
      name: `${parent}secrets/${s}/versions/latest`,
    });

    // @ts-ignore
    secrets[s] = secret.payload.data.toString();
  }
  return res.status(200).json(JSON.stringify(secrets));
};

export default handler;
