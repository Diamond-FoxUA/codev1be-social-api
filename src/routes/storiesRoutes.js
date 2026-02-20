import { Router } from 'express';
import { getAllStories } from '../controllers/storiesController.js';

const router = Router();

router.get('/api/stories', getAllStories);

export default router;
