import { Router } from "express";
import { getAllStories } from "../controllers/storiesController.js";
import { celebrate } from "celebrate";
import { getAllStoriesSchema } from "../validations/storiesValidation.js";

const router = Router();

router.get('/api/stories', celebrate(getAllStoriesSchema), getAllStories);

export default router;
