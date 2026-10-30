import { Request } from "express";
import { AuditLog } from "../models/auditLog.model.js";

/** Records an admin action. Never throws. */
export default async function logAudit(
  req: Request,
  action: "LOGIN" | "ROLE_CHANGE" | "USER_DELETE" | "SETTING_UPDATE",
  targetResource: string,
  outcome: "SUCCESS" | "FAILURE" = "SUCCESS",
  metadata?: Record<string, unknown>
) {
  try {
    await AuditLog.create({
      actorId: req.user?.id ?? "unknown",
      actorEmail: req.user?.email ?? "unknown",
      action,
      targetResource,
      outcome,
      ipAddress: req.ip,
      metadata: metadata ? JSON.stringify(metadata) : undefined,
    });
  } catch (error) {
    console.error("audit log error:", error);
  }
}