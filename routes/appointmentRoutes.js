import { Router } from "express";
import { appointmentController } from "../controllers/appointmentController.js";
import authenticate from "../middleware/authenticate.js";
import { paginate } from "../middleware/paginate.js";

const router = Router();

router.get("/", authenticate, paginate, appointmentController.findAll);
router.get("/:id", authenticate, appointmentController.find);
router.post("/", authenticate, appointmentController.create);
router.patch("/", authenticate, appointmentController.update);

export default router;
