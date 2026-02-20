import { Router } from 'express';
import { getAllStories } from '../controllers/storiesController.js';
import { celebrate } from 'celebrate';
import { createStory, updateStory } from '../controllers/storiesController.js';
import {
  createStorySchema,
  updateStorySchema,
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

export default router;
