import { NextPage } from 'next';
const submit = async (event: any) => {
  event.preventDefault();

  const response = await fetch('/api/hello', {
    method: 'GET',
  });
  response.json().then((x) => {
    for (let y = 0; y < x[0].length; y++) {
      const newimg = document.createElement('img');
      newimg.setAttribute(
        'src',
        'https://storage.cloud.google.com/sep6_images_bucket/' + x[0][y].id
      );
      newimg.setAttribute('width', '50');
      newimg.setAttribute('height', '50');
      // @ts-ignore
      document.getElementById('images').appendChild(newimg);
    }
  });
  console.log('Response is', response);
};

const SubmitPicture: NextPage = () => {
  return (
    <div>
      <h2>Google Storage API Test</h2>
      <input type="file" name="imgfile" accept="image/jpeg" id="imgfile" />
      <button onClick={submit}>Submit</button>
      <div className="" id="images"></div>
    </div>
  );
};

export default SubmitPicture;
