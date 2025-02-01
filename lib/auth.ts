import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { adapter } from "next/dist/server/web/adapter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
export const { auth, handlers, signIn, signOut } = NextAuth({
 providers: [
  credentials({
   name: "credentials",
   credentials: {
    email: { label: "email", type: "email" },
    password: { label: "password", type: "password" },
   },

   authorize: (credentials) => {
    const user = credentials?.email;
    const password = credentials?.password;

    if (user && password) {
     return { id: crypto.randomUUID(), user };
    }
   },
  }),
 ],
 adapter: PrismaAdapter(db),
});
