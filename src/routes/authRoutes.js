import { Router } from "express";
import { registerUser } from '../controllers/authController.js';

const router = Router();

router.post('/api/register', registerUser);

export default router;
