import { Router } from "express";
import { foremanController } from "../controllers/foremanController.js";
import authenticate from "../middleware/authenticate.js";
import { uploadHelper } from "../middleware/uploadHelper.js";

const router = Router();

router.get("/:id", foremanController.findOne);
router.get("/", foremanController.findAll);
router.patch(
  "/",
  authenticate,
  uploadHelper.fields(["avatar", "portfolio"]),
  foremanController.updateData,
);

export default router;
