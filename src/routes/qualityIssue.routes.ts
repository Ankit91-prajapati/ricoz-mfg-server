import { Router } from "express";

import {
  createQualityIssue,
  getQualityIssues,
  getQualityIssue,
  updateQualityIssue,
  deleteQualityIssue,
} from "../controllers/web/qualityIssue.controller.js";

const router = Router();

router.post("/", createQualityIssue);
router.get("/", getQualityIssues);
router.get("/:id", getQualityIssue);
router.patch("/:id", updateQualityIssue);
router.delete("/:id", deleteQualityIssue);

export default router;