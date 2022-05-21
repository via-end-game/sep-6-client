import { NextPage } from 'next';

const submit = async (event: any) => {
  event.preventDefault();
  const data = {
    email: event.target.email.value,
    password: event.target.password.value,
  };

  const JSONdata = JSON.stringify(data);
  console.log(JSONdata);

  const options = {
    // The method is POST because we are sending data.
    method: 'POST',
    // Body of the request is the JSON data we created above.
    body: JSONdata,
  };

  const response = await fetch('http://localhost:3001/v1/auth/log-in', options);
  console.log(response);
};

const Authorization: NextPage = () => {
  return (
    <form onSubmit={submit}>
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email" required />
      <label htmlFor="password">Password:</label>
      <input type="text" id="password" name="password" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Authorization;
