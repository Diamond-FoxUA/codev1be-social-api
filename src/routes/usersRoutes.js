import { Router } from 'express';
import { getAllUsers } from '../controllers/usersController.js';
import { getCurrentUser } from '../controllers/usersController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/api/users', getAllUsers);
router.get('/current', authMiddleware, getCurrentUser);
export default router;
