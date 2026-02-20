import { Router } from 'express';
import {
  registerUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';
import { celebrate } from 'celebrate';
import {
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';

const router = Router();

router.post('/api/register', registerUser);

router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);

router.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword,
);

export default router;
