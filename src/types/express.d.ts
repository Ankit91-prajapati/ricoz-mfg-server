import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    /** Set by the userAuth middleware after the Clerk session is verified. */
    user?: {
      id: string; // MongoDB _id
      clerkId: string;
      email: string;
      name?: string;
      role: "user" | "admin";
      isemailVerified: boolean;
    };
  }
}
