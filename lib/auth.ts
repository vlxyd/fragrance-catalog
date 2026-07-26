import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';

const maybeAdapter = (prisma as any).__isMock ? undefined : PrismaAdapter(prisma as any);
const adminUsername = process.env.ADMIN_USERNAME?.trim() || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD?.trim() || '';

export const authOptions = {
  adapter: maybeAdapter,
  providers: [
    CredentialsProvider({
      name: 'Admin Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials?.username || !credentials?.password) return null;
        if (credentials.username !== adminUsername || credentials.password !== adminPassword) return null;

        return {
          id: 'admin',
          name: 'Admin',
          email: `${adminUsername}@local`,
          role: 'ADMIN',
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }: any) {
      if (token?.role) (session as any).user.role = token.role;
      return session;
    },
  },
  session: { strategy: 'jwt' },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
