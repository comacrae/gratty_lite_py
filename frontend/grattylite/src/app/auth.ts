import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";

export const config = {
  secret: "test",
  debug: true,
  providers: [
    Auth0({
      clientSecret: process.env.AUTH_AUTH0_SECRET,
      clientId: process.env.AUTH_AUTH0_ID,
      issuer: process.env.AUTH_AUTH0_ISSUER,
    }),
  ],
  /*callbacks: {
    jwt({ token, user }) {
      return token;
    },
    session({ session, token }) {
      return session;
    },
  },*/
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
