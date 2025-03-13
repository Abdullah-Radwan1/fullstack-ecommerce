import { UserRole } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string | unknown;
    name?: string | null;
    email?: string | null;
    role?: UserRole | unknown; // Use the `UserRole` enum
    image?: string;
  }

  interface Session {
    user: {
      id: string | unknown;
      name?: string | null;
      email?: string | null;
      role?: UserRole | unknown; // Use the `UserRole` enum
      image?: string;
    };
  }
}
