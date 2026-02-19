import { Router } from "express";
import { celebrate } from "celebrate";
import { getUsers, getUserById } from "../controllers/usersController.js";
import { getUserByIdSchema } from "../validations/userValidation.js";
import { paginationQuerySchema } from "../validations/paginationValidation.js";

const router = Router();

router.get("/users",
  celebrate(paginationQuerySchema),
  getUsers);

router.get(
  "/users/:_id",
  celebrate(getUserByIdSchema),
  getUserById
);

export default router;
