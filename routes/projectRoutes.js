import { Router } from "express";
import { projectController } from "../controllers/projectController.js";
import { paginate } from "../middleware/paginate.js";

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

export default router;
