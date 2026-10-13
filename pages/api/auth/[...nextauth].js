/*
 * [...nextauth].js
 * Classroom API — NextAuth configuration
 *
 * Author: Kevin Tieu
 *
 * Configures authentication providers and the Prisma adapter.
 */

import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../prisma/prisma';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      try {
        if (new URL(url).origin === baseUrl) {
          return url;
        }
      } catch {
        // ignore invalid URL
      }
      return baseUrl;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

if (process.env.GITHUB_OAUTH_PROVIDER_ENABLED === 'true') {
  authOptions.providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  );
}

export default NextAuth(authOptions);
