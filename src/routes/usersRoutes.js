import { Router } from 'express';

import { getAllUsers } from '../controllers/usersController.js';
import { getCurrentUser } from '../controllers/usersController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();
// example
router.get('/api/users', getAllUsers);
// endpoint for getting current user (user profile with saved stories) 
router.get('/api/users/me', authenticate, getCurrentUser);

export default router;
