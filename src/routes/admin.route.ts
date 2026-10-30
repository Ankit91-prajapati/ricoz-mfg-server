import { Router } from "express";
import showUsersData, {
  getSettings,
  listAuditLogs,
  masterDataSummary,
  updateSettings,
  updateUserRole,
} from "../controllers/admin/admin.controller.js";
import userAuth from "../middleware/userAuth.js";
import userRole from "../middleware/userRole.js";

const adminRouter = Router();

adminRouter.use(userAuth, userRole("admin"));

adminRouter.get("/data", showUsersData);
adminRouter.patch("/users/:id/role", updateUserRole);
adminRouter.get("/audit-logs", listAuditLogs);
adminRouter.get("/master-data", masterDataSummary);
adminRouter.get("/settings", getSettings);
adminRouter.put("/settings", updateSettings);

export default adminRouter;