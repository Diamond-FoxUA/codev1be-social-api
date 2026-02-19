import { Router } from 'express';
import {
  getAllStories,
  addToFavorites,
  removeFromFavorites,
} from '../controllers/storiesController.js';

const router = Router();

router.get('/api/stories', getAllStories);
router.post('/api/stories/favorite/:storyId', addToFavorites);
router.delete('/api/stories/favorite/:storyId', removeFromFavorites);

export default router;
