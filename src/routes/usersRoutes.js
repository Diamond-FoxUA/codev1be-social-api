import { Router } from 'express';

import { getAllUsers, updateUser } from '../controllers/usersController.js';
import { getCurrentUser } from '../controllers/usersController.js';
import { authenticate } from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';
import { updateUserSchema } from '../validations/userValidation.js';

const router = Router();
// example
router.get('/api/users', getAllUsers);
// endpoint for getting current user (user profile with saved stories)
router.get('/api/users/me', authenticate, getCurrentUser);
router.patch('/user/me', authenticate, celebrate(updateUserSchema), updateUser);

export default router;
