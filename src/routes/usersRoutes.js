import { Router } from "express";
import { celebrate } from "celebrate";
import { getUsers, getUserById, getCurrentUser, updateUser } from "../controllers/usersController.js";
import { getUsersSchema, userIdSchema, updateUserSchema } from "../validations/usersValidation.js";
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get("/", celebrate(getUsersSchema), getUsers);
router.get("/:userId", celebrate(userIdSchema), getUserById);

router.get('/me', authenticate, getCurrentUser);
router.patch('/me', authenticate, celebrate(updateUserSchema), updateUser);

export default router;
