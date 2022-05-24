import { NextPage } from 'next';

const submit = async (event: any) => {
  event.preventDefault();

  const response = await fetch('http://localhost:3001/v1/auth/log-in', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email: 'ddd@aaa.com',
      password: 'secret777',
    }),
  });

  console.log(response);
};

const Authorization: NextPage = () => {
  return (
    <form onSubmit={submit}>
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email" />
      <label htmlFor="password">Password:</label>
      <input type="text" id="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Authorization;
