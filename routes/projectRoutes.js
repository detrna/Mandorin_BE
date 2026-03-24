import { Router } from "express";
import { projectController } from "../controllers/projectController.js";
import { paginate } from "../middleware/paginate.js";
import { reportController } from "../controllers/reportController.js";
import { uploadHelper } from "../middleware/uploadHelper.js";

const router = Router();

router.post("/", projectController.create);
router.get("/", paginate(), projectController.findAll);
router.get("/:id", projectController.find);
router.post("/:projectId/milestones", projectController.addMilestone);
router.get(
  "/:projectId/milestones",
  paginate(),
  projectController.findMilestones,
);
router.post(
  "/:projectId/reports",
  uploadHelper.single("photo"),
  reportController.create,
);
router.get("/:projectId/reports", paginate(), reportController.findAll);

export default router;
