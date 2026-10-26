import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import syncUser from "../lib/syncUser.js";

/**
 * Requires a valid Clerk session (Bearer token from the client) and attaches
 * the matching Mongo user to req.user. clerkMiddleware() must run before this.
 */
export default async function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "You are not authenticated" });
    }

    const user = await syncUser(userId);

    req.user = {
      id: String(user._id),
      clerkId: userId,
      email: user.email,
      name: user.username ?? undefined,
      role: user.role as "user" | "admin",
      isemailVerified: user.isemailVerified,
    };
    next();
  } catch (error) {
    console.error("userAuth error:", error);
    return res.status(401).json({ success: false, message: "Invalid session" });
  }
}
