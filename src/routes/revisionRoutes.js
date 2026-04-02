import { Router } from "express";
import { revisionController } from "../../controllers/revisionController.js";
import authenticate from "../middleware/authenticate.js";
import { paginate } from "../middleware/paginate.js";

const router = Router();

router.post("/", authenticate, revisionController.create);
router.get("/", authenticate, paginate, revisionController.findAll);
router.get("/:id", authenticate, revisionController.find);

export default router;
