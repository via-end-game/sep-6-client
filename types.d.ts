import type { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user?: DefaultUser & {
      id: number;
    };
  }
}

declare module 'next-auth/jwt/types' {
  // eslint-disable-next-line no-unused-vars
  interface JWT {
    uid: number;
  }
}
