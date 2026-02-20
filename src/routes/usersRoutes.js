import { Router } from "express";
import { celebrate } from "celebrate";
import { getUsers, getUserById } from "../controllers/usersController.js";
import { getUsersSchema, userIdSchema } from "../validations/usersValidation.js";

const router = Router();

router.get("/", celebrate(getUsersSchema), getUsers);
router.get("/:userId", celebrate(userIdSchema), getUserById);

export default router;
