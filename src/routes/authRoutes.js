import { Router } from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';
import { celebrate } from 'celebrate';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';

const router = Router();

router.post('/api/register', celebrate(registerUserSchema), registerUser);
router.post('/api/login', celebrate(loginUserSchema), loginUser);
router.post('/api/logout', logoutUser);
export default router;
