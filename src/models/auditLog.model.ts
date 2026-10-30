import mongoose, { Schema } from "mongoose";

const AuditLogSchema = new Schema(
  {
    actorId: { type: String, required: true },
    actorEmail: { type: String, required: true },
    action: {
      type: String,
      enum: ["LOGIN", "ROLE_CHANGE", "USER_DELETE", "SETTING_UPDATE"],
      required: true,
    },
    targetResource: { type: String, required: true },
    outcome: { type: String, enum: ["SUCCESS", "FAILURE"], default: "SUCCESS" },
    ipAddress: { type: String },
    metadata: { type: String }, // JSON string
  },
  { timestamps: { createdAt: "timestamp", updatedAt: false } }
);

AuditLogSchema.index({ timestamp: -1 });

export const AuditLog = mongoose.model("AuditLog", AuditLogSchema);