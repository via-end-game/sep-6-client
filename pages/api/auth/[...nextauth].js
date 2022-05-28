import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          const response = await fetch('http://localhost:3005/login', {
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });

          const data = await response.json();
          console.log('Response from the /login end-point ->', data);

          if (response.ok) return data;

          return null;
        } catch (error) {
          console.error('Error while trying to log-in ->', error);
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
  },
});
