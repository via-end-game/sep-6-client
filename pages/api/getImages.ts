// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Storage } from '@google-cloud/storage';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  let projectId = process.env.GOOGLE_PROJECT_ID;
  let keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS; // Get this from Google Cloud -> Credentials -> Service Accounts
  const storage = new Storage({
    projectId,
    keyFilename,
  });
  // @ts-ignore
  const bucket = storage.bucket(process.env.BUCKET.toString());
  try {
    const [files] = await bucket.getFiles();
    let linkArray = [];
    for (let y = 0; y < files.length; y++) {
      linkArray.push(
        `https://storage.cloud.google.com/${process.env.BUCKET}/${files[y].id}`
      );
    }
    res.send(linkArray);
  } catch (error) {
    res.send('Error:' + error);
  }
};

export default handler;
