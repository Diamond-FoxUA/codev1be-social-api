import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllStories,
  addToFavorites,
  removeFromFavorites,
  getFavouriteStories,
} from '../controllers/storiesController.js';
import { storyIdSchema } from '../validations/storiesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/api/stories', getAllStories);

router.use('/api/stories/:storyId/save', authenticate);

// TODO: getFavouriteStories
router.get('/api/stories/saved', authenticate, getFavouriteStories);
router.post(
  '/api/stories/:storyId/save',
  celebrate(storyIdSchema),
  addToFavorites,
);
router.delete(
  '/api/stories/:storyId/save',
  celebrate(storyIdSchema),
  removeFromFavorites,
);

export default router;
