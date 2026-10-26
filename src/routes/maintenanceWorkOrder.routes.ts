import { Router } from "express";

import {
  createMaintenanceWorkOrder,
  getMaintenanceWorkOrders,
  getMaintenanceWorkOrder,
  updateMaintenanceWorkOrder,
  deleteMaintenanceWorkOrder,
} from "../controllers/web/maintenanceWorkOrder.controller.js";

const router = Router();

router.post("/", createMaintenanceWorkOrder);
router.get("/", getMaintenanceWorkOrders);
router.get("/:id", getMaintenanceWorkOrder);
router.patch("/:id", updateMaintenanceWorkOrder);
router.delete("/:id", deleteMaintenanceWorkOrder);

export default router;