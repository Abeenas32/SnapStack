import { Router } from "express";
import { registeruser } from "../controllers/register.controller";
import { registerSchema, type RegisterSchema} from "../utils/registerSchema";
import { validate } from "../middleware/validator";

const router = Router();
router.post("/register", validate(registerSchema), registeruser);

export default router;


