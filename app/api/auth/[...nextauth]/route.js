// /api/auth/[...nextauth]/route.js

import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      // name: "Credentials",

      type: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { username, password } = credentials;

        try {
          // Find the user in the database based on the provided username or email
          await connectToDB();
          const user = await User.findOne({
            $or: [{ username }, { email: username }],
          });

          // Check if the user exists and the password matches
          if (user && user.password === password) {
            // Any object returned will be saved in `user` property of the JWT
            return {
              id: user._id.toString(),
              username: user.username,
              email: user.email,
              role: user.role,
            };
          } else {
            // If the user is not found or password doesn't match, return null
            return null;
          }
        } catch (error) {
          // Handle any errors that might occur during the database query
          console.error("Error during authentication:", error);
          throw new Error("Failed to authenticate. Please try again later.");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user.id) {
        console.log("login true");

        return true;
      } else {
        console.log("login false");
        return false;
      }
    },
    async session({ session }) {
      console.log("🚀 ~ file: route.js:63 ~ session ~ session:", session);
      return session;
    },
    async authorized({ req, token }) {
      console.log("🚀 ~ file: route.js:84 ~ authorized ~ token:", token);
      if (token) return true; // If there is a token, the user is authenticated
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
