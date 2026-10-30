import { Request, Response } from "express";
import User from "../../models/user.model.js";
import { AuditLog } from "../../models/auditLog.model.js";
import { Setting } from "../../models/setting.model.js";
import { Product } from "../../models/product.model.js";
import { Machine } from "../../models/machine.model.js";
import { Inventory } from "../../models/inventory.model.js";
import { Supplier } from "../../models/supplier.model.js";
import logAudit from "../../lib/audit.js";

export default async function showUsersData(req: Request, res: Response) {
  try {
    const users = await User.find();
    const safeUsers = users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isemailVerified: user.isemailVerified,
      createdAt: user.createdAt,
    }));
    return res.status(200).json({ success: true, message: "Data successfully fetched", users: safeUsers });
  } catch (error) {
    return res.status(500).json({ success: false, error: "users not found", message: "Users not found" });
  }
}

/* ---------- Role management ---------- */

export async function updateUserRole(req: Request, res: Response) {
  const targetId = String(req.params.id);
  try {
    const { role } = req.body as { role?: string };
    if (role !== "user" && role !== "admin") {
      return res.status(400).json({ success: false, message: "role must be 'user' or 'admin'" });
    }
    const target = await User.findById(targetId);
    if (!target) return res.status(404).json({ success: false, message: "User not found" });

    if (target.role === "admin" && role === "user") {
      if (String(target._id) === req.user?.id) {
        await logAudit(req, "ROLE_CHANGE", `User:${targetId}`, "FAILURE", { reason: "self-demotion" });
        return res.status(400).json({ success: false, message: "You cannot remove your own admin role" });
      }
      if ((await User.countDocuments({ role: "admin" })) <= 1) {
        await logAudit(req, "ROLE_CHANGE", `User:${targetId}`, "FAILURE", { reason: "last-admin" });
        return res.status(400).json({ success: false, message: "At least one administrator is required" });
      }
    }

    const from = target.role;
    target.role = role;
    await target.save();
    await logAudit(req, "ROLE_CHANGE", `User:${targetId}`, "SUCCESS", { from, to: role, email: target.email });

    return res.status(200).json({
      success: true,
      user: {
        id: target._id,
        username: target.username,
        email: target.email,
        role: target.role,
        isemailVerified: target.isemailVerified,
        createdAt: target.createdAt,
      },
    });
  } catch {
    return res.status(500).json({ success: false, message: "Could not update role" });
  }
}

/* ---------- Audit logs ---------- */

export async function listAuditLogs(req: Request, res: Response) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25));
    const filter: Record<string, unknown> = {};
    if (req.query.action) filter.action = String(req.query.action);
    if (req.query.outcome) filter.outcome = String(req.query.outcome);
    if (req.query.actor)
      filter.actorEmail = {
        $regex: String(req.query.actor).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        $options: "i",
      };

    const [logs, total] = await Promise.all([
      AuditLog.find(filter as never).sort({ timestamp: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      AuditLog.countDocuments(filter as never),
    ]);
    return res.status(200).json({ success: true, logs, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return res.status(500).json({ success: false, message: "Could not load audit logs" });
  }
}

/* ---------- Master data summary ---------- */

export async function masterDataSummary(_req: Request, res: Response) {
  try {
    const [products, machines, inventory, suppliers] = await Promise.all([
      Product.countDocuments(),
      Machine.countDocuments(),
      Inventory.countDocuments(),
      Supplier.countDocuments(),
    ]);
    return res.status(200).json({ success: true, counts: { products, machines, inventory, suppliers } });
  } catch {
    return res.status(500).json({ success: false, message: "Could not load master data summary" });
  }
}

/* ---------- Organization settings ---------- */

export async function getSettings(_req: Request, res: Response) {
  try {
    const settings = await Setting.findOneAndUpdate(
      { key: "organization" },
      { $setOnInsert: { key: "organization" } },
      { upsert: true, new: true }
    ).lean();
    return res.status(200).json({ success: true, settings });
  } catch {
    return res.status(500).json({ success: false, message: "Could not load settings" });
  }
}

export async function updateSettings(req: Request, res: Response) {
  try {
    const { plantName, plantCode, contactEmail } = req.body as Record<string, string | undefined>;
    const update: Record<string, string> = {};
    for (const [k, v] of Object.entries({ plantName, plantCode, contactEmail })) {
      if (typeof v === "string") {
        if (!v.trim()) return res.status(400).json({ success: false, message: `${k} cannot be empty` });
        update[k] = v.trim();
      }
    }
    if (update.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(update.contactEmail)) {
      return res.status(400).json({ success: false, message: "Invalid contact email" });
    }
    const settings = await Setting.findOneAndUpdate(
      { key: "organization" },
      { $set: update, $setOnInsert: { key: "organization" } },
      { upsert: true, new: true }
    ).lean();
    await logAudit(req, "SETTING_UPDATE", "Setting:organization", "SUCCESS", update);
    return res.status(200).json({ success: true, settings });
  } catch {
    return res.status(500).json({ success: false, message: "Could not save settings" });
  }
}