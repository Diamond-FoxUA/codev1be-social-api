import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllStories,
  addToFavorites,
  removeFromFavorites,
  getFavouriteStories,
  createStory,
  updateStory,
} from '../controllers/storiesController.js';
import {
  createStorySchema,
  updateStorySchema,
  storyIdSchema,
} from '../validation/storiesValidation.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.get('/api/stories', getAllStories);
router.post(
  '/api/stories',
  authenticate,
  upload.single('storyImage'),
  celebrate(createStorySchema),
  createStory,
);
router.patch(
  '/api/stories/:storyId',
  authenticate,
  upload.single('storyImage'),
  celebrate(updateStorySchema),
  updateStory,
);

router.use('/api/stories/:storyId/save', authenticate);

// Favourite stories
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
