// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';
import { Storage } from '@google-cloud/storage';

let projectId = 'sep6-351006'; // Get this from Google Cloud
let keyFilename = 'sep6.json'; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket('sep6_images_bucket');

export default nextConnect().get(async (req: any, res: any) => {
  try {
    const [files] = await bucket.getFiles();
    res.send([files]);
  } catch (error) {
    res.send('Error:' + error);
  }
  res.status(200).json('Everything is ok');
});
