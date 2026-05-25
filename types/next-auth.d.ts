import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role: "admin" | "presenter" | "correspondent";
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "presenter" | "correspondent";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "admin" | "presenter" | "correspondent";
  }
}
