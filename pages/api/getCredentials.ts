import nextConnect from 'next-connect';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const parent = 'projects/1037204785736/';

export default nextConnect().get(async (req: any, res: any) => {
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
  res.status(200).json(JSON.stringify(secrets));
});
