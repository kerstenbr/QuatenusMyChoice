import { Router } from "express";
import familyRoute from "./familyRoute.js";
import userRoute from "./userRoute.js";
import roleRoute from "./roleRoute.js";

const router = Router();

router.use("/families", familyRoute);
router.use("/user", userRoute);
router.use("/role", roleRoute);

export default router;
