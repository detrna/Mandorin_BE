import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import { paginate } from "../middleware/paginate.js";
import { proposalController } from "../controllers/proposalController.js";
import { uploadHelper } from "../middleware/uploadHelper.js";
import { roleGuard } from "../middleware/roleGuard.js";
import { validate } from "../middleware/validate.js";
import { proposalSchema } from "../validator/proposalSchema.js";

const router = Router();

router.get("/", authenticate, paginate(), proposalController.findAll);
router.get("/:id", authenticate, proposalController.find);
router.post(
  "/",
  authenticate,
  roleGuard("foreman"),
  uploadHelper.single("photo"),
  validate(proposalSchema.create),
  proposalController.create,
);
router.patch(
  "/:id",
  authenticate,
  roleGuard("foreman"),
  validate(proposalSchema.update),
  proposalController.update,
);
router.delete("/:id", authenticate, proposalController.delete);
router.patch(
  "/:id/pay",
  authenticate,
  roleGuard("client"),
  proposalController.pay,
);
router.post("/notification", proposalController.notification);

export default router;
