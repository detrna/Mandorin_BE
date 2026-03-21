import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import { paginate } from "../middleware/paginate.js";
import { proposalController } from "../controllers/proposalController.js";
import { uploadHelper } from "../middleware/uploadHelper.js";

const router = Router();

router.get("/", authenticate, paginate(), proposalController.findAll);
router.get("/:id", authenticate, proposalController.find);
router.post(
  "/",
  authenticate,
  uploadHelper.single("photo"),
  proposalController.create,
);
router.patch("/:id", authenticate, proposalController.update);

export default router;
