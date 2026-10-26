import { Router } from "express";

import {
  createBOM,
  getBOMs,
  getBOM,
  updateBOM,
  deleteBOM,
} from "../controllers/web/bom.controller.js";

const router = Router();

router.post("/", createBOM);
router.get("/", getBOMs);
router.get("/:id", getBOM);
router.patch("/:id", updateBOM);
router.delete("/:id", deleteBOM);

export default router;