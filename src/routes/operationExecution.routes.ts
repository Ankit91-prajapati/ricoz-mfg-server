import { Router } from "express";

import {
  createOperationExecution,
  getOperationExecutions,
  getOperationExecution,
  updateOperationExecution,
} from "../controllers/web/operationExecution.controller.js";

const router = Router();

router.post("/", createOperationExecution);
router.get("/", getOperationExecutions);
router.get("/:id", getOperationExecution);
router.patch("/:id", updateOperationExecution);

export default router;