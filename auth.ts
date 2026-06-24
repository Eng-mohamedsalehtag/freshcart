import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const payload = await res.json();
        if (!res.ok) {
          throw new Error(payload.message);
        }

        if (payload.message !== "success") {
          return null;
        }

        return {
          user: payload.user,
          token: payload.token,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // أول مرة تسجيل الدخول
      if (user) {
        token.user = user?.user;
        token.token = user?.token;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token?.user;

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
