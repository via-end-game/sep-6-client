import { NextPage } from 'next';

const getSecrets = async (event: any) => {
  event.preventDefault();
  const response = await fetch('/api/getCredentials', {
    method: 'GET',
  });
  response.json().then((res) => {
    console.log('Response: ' + res);
  });
};

const submit = async (event: any) => {
  event.preventDefault();
  const response = await (
    await fetch('/api/get-avatars', {
      method: 'GET',
    })
  ).json();
  console.log('Response: ', response);
};

const SubmitPicture: NextPage = () => {
  return (
    <div>
      <h2>Google Storage API Test</h2>
      <input type="file" name="imgfile" accept="image/jpeg" id="imgfile" />
      <button onClick={submit}>Submit</button>
      <button onClick={getSecrets}>Get secrets</button>
      <div className="" id="images"></div>
    </div>
  );
};

export default SubmitPicture;
