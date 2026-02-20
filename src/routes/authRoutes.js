import { Router } from 'express';
import { celebrate } from 'celebrate';
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';
import { loginUserSchema, registerUserSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/register', celebrate(registerUserSchema), registerUser);
router.post('/login', celebrate(loginUserSchema), loginUser);
router.post('/logout', logoutUser);

export default router;
