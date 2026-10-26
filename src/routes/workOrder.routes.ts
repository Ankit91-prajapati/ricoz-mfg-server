import { Router } from "express";

import {
  createWorkOrder,
  getWorkOrders,
  getWorkOrder,
  updateWorkOrder,
  deleteWorkOrder,
} from "../controllers/web/workOrder.controller.js";

const router = Router();

router.post("/", createWorkOrder);
router.get("/", getWorkOrders);
router.get("/:id", getWorkOrder);
router.patch("/:id", updateWorkOrder);
router.delete("/:id", deleteWorkOrder);

export default router;