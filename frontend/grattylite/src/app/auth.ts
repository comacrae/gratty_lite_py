import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const config = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(request) {
        return { id: "1", email: "test@gmail.com", name: "jane" };
      },
    }),
  ],
  secret: "test",
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
