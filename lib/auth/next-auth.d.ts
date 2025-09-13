import { UserRole } from "@prisma/client";
import "next-auth";
import email from "next-auth/providers/email";
import image from "next/image";

declare module "next-auth" {
  interface User {
    id: string | unknown;
    name?: string | null;
    email?: string | null;
    role?: UserRole | unknown; // Use the `UserRole` enum
    image?: string;
  }

  export interface Session {
    user: {
      id: string | unknown;
      name?: string | null;
      email?: string | null;
      role?: UserRole | unknown; // Use the `UserRole` enum
      image?: string;
    };
  }
}
