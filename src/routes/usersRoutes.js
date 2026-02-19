import { Router } from 'express';
import { getAllUsers, updateUser } from '../controllers/usersController.js';

const router = Router();

router.get('/api/users', getAllUsers);

router.patch('/user/me', authenticate, updateUser);

export default router;
