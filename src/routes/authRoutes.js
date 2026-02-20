import { Router } from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';
import { celebrate } from 'celebrate';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', celebrate(registerUserSchema), registerUser);
router.post('/login', celebrate(loginUserSchema), loginUser);
router.post('/logout', logoutUser);
export default router;
