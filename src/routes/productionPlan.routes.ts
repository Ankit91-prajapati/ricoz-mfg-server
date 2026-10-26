import { Router } from "express";

import {
  createProductionPlan,
  getProductionPlans,
  getProductionPlan,
  updateProductionPlan,
  deleteProductionPlan,
} from "../controllers/web/productionPlan.controller.js";

const router = Router();

router.post("/", createProductionPlan);
router.get("/", getProductionPlans);
router.get("/:id", getProductionPlan);
router.patch("/:id", updateProductionPlan);
router.delete("/:id", deleteProductionPlan);

export default router;