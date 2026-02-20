import { Router } from "express";
import { celebrate } from "celebrate";
import { getUsers, getUserById } from "../controllers/usersController.js";
import { getUsersSchema } from "../validations/usersValidation.js";


import { getAllUsers } from '../controllers/usersController.js';
import { getCurrentUser } from '../controllers/usersController.js';
import { authenticate } from '../middleware/authMiddleware.js';

router.get("/", celebrate(getUsersSchema), getUsers);
router.get("/:userId", celebrate(), getUserById);

export default router;
