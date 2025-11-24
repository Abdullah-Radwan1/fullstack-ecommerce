// authOptions.ts
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/prisma/db";
import bcrypt from "bcrypt";
import { UserRole } from "../generated/prisma/enums";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text", optional: true },
        role: { label: "Role", type: "text", optional: true },
        isSignUp: { label: "Is Sign Up", type: "hidden" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const isSignUp = credentials.isSignUp === "true";
        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (isSignUp && existingUser) {
          throw new Error("User already exists.");
        }

        if (!isSignUp && !existingUser) {
          throw new Error("User not found. Please sign up.");
        }

        if (existingUser) {
          const isValid = await bcrypt.compare(
            credentials.password,
            existingUser.password!
          );
          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          // Manually return user with id (IMPORTANT 🔥)
          return {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
          };
        }

        if (!credentials.name) {
          throw new Error("Name is required for sign-up.");
        }

        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const newUser = await db.user.create({
          data: {
            name: credentials.name,
            email: credentials.email,
            password: hashedPassword,
            role: credentials.role as UserRole,
          },
        });

        // Manually return user with id (IMPORTANT 🔥)
        return {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // Default to JWT
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const typedUser = user as { id: string; role: string };
        token.id = typedUser.id;
        token.role = typedUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id; // Add user ID to the session
        session.user.role = token.role;
      }
      return session;
    },
  },
};
