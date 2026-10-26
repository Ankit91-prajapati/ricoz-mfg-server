import { Router } from "express";

import {
  createSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/web/supplier.controller.js";

const router = Router();

router.post("/", createSupplier);
router.get("/", getSuppliers);
router.get("/:id", getSupplier);
router.patch("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;