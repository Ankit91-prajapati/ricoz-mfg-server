import { Request } from "express";
import AuditLog, { AuditAction } from "../models/auditLog.model.js";

export default async function writeAudit(
  req: Request,
  action: AuditAction,
  targetResource: string,
  metadata?: Record<string, unknown>
) {
  if (!req.user) return;

  try {
    await AuditLog.create({
      actorId: req.user.id,
      actorEmail: req.user.email,
      action,
      targetResource,
      ipAddress: req.ip,
      metadata,
    });
  } catch (e) {
    // an audit failure should never break the request
    console.error("Audit write failed:", (e as Error).message);
  }
}