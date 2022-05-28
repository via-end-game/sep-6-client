import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.avatarUrl = token.avatarUrl;
        session.user.fullName = token.fullName;
        session.user.email = token.email;
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.avatarUrl = user.avatarUrl;
        token.email = user.email;
        token.fullName = user.username;
        token.uid = user.userID;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          const response = await fetch(`${process.env.GCF_URL}/log-in`, {
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
    strategy: 'jwt',
  },
});
