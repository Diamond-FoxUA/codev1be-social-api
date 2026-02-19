import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllStories,
  addToFavorites,
  removeFromFavorites,
} from '../controllers/storiesController.js';
import { storyIdSchema } from '../validations/storiesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use('/favorite', authenticate);

router.get('/api/stories', getAllStories);

router.post(
  '/api/stories/favorite/:storyId',
  celebrate(storyIdSchema),
  addToFavorites,
);
router.delete(
  '/favorite/:storyId',
  celebrate(storyIdSchema),
  removeFromFavorites,
);

export default router;
