import { Router } from 'express';

import { getAllUsers } from '../controllers/usersController.js';
import { getCurrentUser } from '../controllers/usersController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { updateUserAvatar } from '../controllers/usersController.js';
import { upload } from "../middleware/multer.js";


const router = Router();
// example
router.get('/api/users', getAllUsers);
// endpoint for getting current user (user profile with saved stories)
router.get('/api/users/me', authenticate, getCurrentUser);

router.patch(
  '/api/users/avatar',
  authenticate,
  upload.single("avatar"),
  updateUserAvatar,
);


export default router;
