import { Router } from "express";
import { projectController } from "../controllers/projectController.js";
import { paginate } from "../middleware/paginate.js";
import { reportController } from "../controllers/reportController.js";
import { uploadHelper } from "../middleware/uploadHelper.js";
import { validate } from "../middleware/validate.js";
import { projectSchema } from "../validator/projectSchema.js";
import { milestoneSchema } from "../validator/milestoneSchema.js";
import { milestoneController } from "../controllers/milestoneController.js";
import authenticate from "../middleware/authenticate.js";
import { roleGuard } from "../middleware/roleGuard.js";
import { reportSchema } from "../validator/reportSchema.js";

const router = Router();

router.post("/", validate(projectSchema.create), projectController.create);
router.get("/", paginate(), projectController.findAll);
router.get("/:id", projectController.find);
router.patch(
  "/:id",
  authenticate,
  roleGuard("foreman"),
  projectController.update,
);
router.post(
  "/:projectId/milestones",
  authenticate,
  roleGuard("foreman"),
  validate(milestoneSchema.create),
  milestoneController.addMilestone,
);
router.get(
  "/:projectId/milestones",
  authenticate,
  paginate(10),
  milestoneController.findMilestones,
);
router.post(
  "/:projectId/reports",
  authenticate,
  roleGuard("foreman"),
  uploadHelper.single("photo"),
  validate(reportSchema.create),
  reportController.create,
);
router.get(
  "/:projectId/reports",
  authenticate,
  paginate(6),
  reportController.findAll,
);

export default router;
