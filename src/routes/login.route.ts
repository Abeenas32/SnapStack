import {Router} from"express";
import { loginUser_ } from "../controllers/login.controller";
import { loginSchema } from "../utils/loginSchema";
import { validate } from "../middleware/validator";

const router = Router();
router.post("/login", validate(loginSchema), loginUser_);
 export default router;

