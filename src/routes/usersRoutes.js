import { Router } from "express";
import { getAllUsers } from "../controllers/usersController.js";

const router = Router();

router.get('/api/users', getAllUsers);

export default router;
