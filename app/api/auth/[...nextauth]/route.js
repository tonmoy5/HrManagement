// /api/auth/[...nextauth]/route.js

import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import Employee from "../../../../models/employee";
import User from "../../../../models/user";
import { connectToDB } from "../../../../utils/database";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials;
        console.log("🚀 ~ file: route.js:20 ~ authorize ~ username:", username);

        try {
          await connectToDB();
          let user =
            (await Employee.findOne({
              $or: [{ username }, { email: username }],
            })) ||
            (await User.findOne({
              $or: [{ username }, { email: username }],
            }));

          if (
            user &&
            (user.password === password ||
              bcrypt.compare(password, user.password))
          ) {
            const loggedIn = user.toObject();
            const loggedInUser = {
              id: loggedIn._id.toString(),
              name: loggedIn.fullName,
              email: loggedIn.email,
              role: loggedIn.role,
            };
            return loggedInUser;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Failed to authenticate. Please try again later.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      if (trigger === "update" && session?.email) {
        token.email = session.email;
        token.name = session.name;
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (user.id) {
        return true;
      } else {
        return false;
      }
    },
    async session({ session, user, token }) {
      if (user) {
        session.id = user.id;
        session.role = user.role;
      }
      return session;
    },
    async authorized({ req, token }) {
      if (token) return true;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
