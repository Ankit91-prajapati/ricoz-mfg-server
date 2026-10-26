import { clerkClient } from "@clerk/express";
import User from "../models/user.model.js";

/**
 * Finds the Mongo user for a Clerk user id, creating / linking it on first sight.
 *  1. already linked by clerkId  -> return it
 *  2. same email exists (legacy account from before Clerk) -> link it, keeps its role + _id
 *  3. otherwise create a new "user"
 * A Clerk publicMetadata.role of "admin" is honoured when the record is created/linked.
 */
export default async function syncUser(clerkId: string) {
  const existing = await User.findOne({ clerkId });
  if (existing) return existing;

  const cu = await clerkClient.users.getUser(clerkId);
  const primary =
    cu.emailAddresses.find((e) => e.id === cu.primaryEmailAddressId) ??
    cu.emailAddresses[0];

  if (!primary) throw new Error("Clerk user has no email address");

  const email = primary.emailAddress.toLowerCase().trim();
  const verified = primary.verification?.status === "verified";
  const name =
    cu.username ||
    [cu.firstName, cu.lastName].filter(Boolean).join(" ") ||
    email.split("@")[0];
  const metaRole = (cu.publicMetadata as { role?: string } | undefined)?.role;

  const legacy = await User.findOne({ email });
  if (legacy) {
    legacy.clerkId = clerkId;
    legacy.isemailVerified = verified || legacy.isemailVerified;
    if (!legacy.username) legacy.username = name;
    await legacy.save();
    return legacy;
  }

  return User.create({
    clerkId,
    email,
    username: name,
    role: metaRole === "admin" ? "admin" : "user",
    isemailVerified: verified,
  });
}
